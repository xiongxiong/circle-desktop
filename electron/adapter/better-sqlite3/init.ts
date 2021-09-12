export const pragmas: {cmd: string, res?: string}[] = [
    {
        cmd: 'recursive_triggers = true',
        res: 'recursive_triggers'
    }
];

export const initTable: string = 
`

-- [TABLE]

drop table if exists "todo";

CREATE TABLE "todo" (
    "id" integer NOT NULL,
    "parentId" integer NOT NULL DEFAULT (0),
    "listId" integer NOT NULL,
    "content" varchar NOT NULL,
    "comment" varchar NOT NULL DEFAULT (''),
    "createdAt" datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isFinish" boolean NOT NULL DEFAULT (0),
    "isDelete" boolean NOT NULL DEFAULT (0),
    "isAncestorDelete" boolean NOT NULL DEFAULT (0),
    "childrenCount" integer NOT NULL DEFAULT (0),
    "childrenFinish" integer NOT NULL DEFAULT (0),
    "childrenDelete" integer NOT NULL DEFAULT (0),
    "childrenPriority" integer NOT NULL DEFAULT (0),
    "priority" integer NOT NULL DEFAULT (5),
    PRIMARY KEY("id" AUTOINCREMENT)
);

drop table if exists "todo_closure";

CREATE TABLE "todo_closure" (
	"idAncestor"	integer NOT NULL,
	"idDescendant"	integer NOT NULL,
	"length"	integer NOT NULL,
	PRIMARY KEY("idAncestor","idDescendant")
);

drop table if exists "list";

CREATE TABLE "list" (
	"id"	INTEGER NOT NULL,
	"parentId"	INTEGER NOT NULL,
	"title"	VARCHAR NOT NULL,
	"isGroup"	INTEGER NOT NULL DEFAULT (0),
	"isDelete"	INTEGER NOT NULL DEFAULT (0),
	"createdAt"	VARCHAR NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"updatedAt"	VARCHAR NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY("id" AUTOINCREMENT)
);

drop table if exists "list_closure";

CREATE TABLE "list_closure" (
	"idAncestor"	integer NOT NULL,
	"idDescendant"	integer NOT NULL,
	"length"	integer NOT NULL,
	PRIMARY KEY("idAncestor","idDescendant")
);

-- [TRIGGER]

drop trigger if exists onTodoInsertCommon;

create trigger onTodoInsertCommon after insert on todo
	begin
        insert into todo_closure (idAncestor, idDescendant, length) select idAncestor, new.id, length + 1 from todo_closure where idDescendant = new.parentId union all select new.id, new.id, 0;
    end;

drop trigger if exists onTodoInsertNotDelete;

create trigger onTodoInsertNotDelete after insert on todo
    when new.isDelete = 0
	begin
    	update todo set childrenCount = (select count(1) from todo where parentId = new.parentId) where id = new.parentId;
    end;

drop trigger if exists onTodoUpdate;

create trigger onTodoUpdate after update of parentId, content, comment, isFinish, isDelete, priority on todo
    when 
        case 
            when old.isDelete = new.isDelete and new.isDelete = 1 then raise(fail, 'TODO_ALREADY_DELETE')
            when old.isFinish = new.isFinish and new.isFinish = 1 then raise(fail, 'TODO_ALREADY_FINISH')
            when old.parentId != new.parentId or old.content != new.content or old.comment != new.comment or old.isFinish != new.isFinish or old.isDelete != new.isDelete or old.priority != new.priority then 1
            else 0
        end
    begin
        update todo set updatedAt = CURRENT_TIMESTAMP where id = new.id;
    end;
    
drop trigger if exists onTodoUpdateParentId;

create trigger onTodoUpdateParentId after update of parentId on todo
    when new.parentId != old.parentId
	begin
        update todo set listId = (select listId from todo where id = new.parentId) where id = new.id;
    	delete from todo_closure where idDescendant in (select idDescendant from (select idDescendant from todo_closure where idAncestor = new.id)) and idAncestor in (select idAncestor from (select idAncestor from todo_closure where idDescendant = new.id and idAncestor != idDescendant));
        update todo set childrenCount = (select count(1) from todo where parentId = old.parentId) where id = old.parentId;
        update todo set childrenFinish = (select count(1) from todo where parentId = old.parentId and isFinish = 1 and isDelete = 0) where id = old.parentId;
        update todo set childrenDelete = (select count(1) from todo where parentId = old.parentId and isDelete = 1) where id = old.parentId;
    	insert into todo_closure (idAncestor, idDescendant, length) select p_tree.idAncestor, c_tree.idDescendant, p_tree.length + c_tree.length + 1 from todo_closure p_tree cross join todo_closure c_tree where p_tree.idDescendant = new.parentId and c_tree.idAncestor = new.id;
        update todo set childrenCount = (select count(1) from todo where parentId = new.parentId) where id = new.parentId;
        update todo set childrenFinish = (select count(1) from todo where parentId = new.parentId and isFinish = 1 and isDelete = 0) where id = new.parentId;
        update todo set childrenDelete = (select count(1) from todo where parentId = new.parentId and isDelete = 1) where id = new.parentId;
    end;

drop trigger if exists onTodoUpdateIsFinish;

create trigger onTodoUpdateIsFinish after update of isFinish on todo
    when new.isFinish != old.isFinish and
        case 
            when new.isFinish = 1 and new.childrenCount > new.childrenFinish + new.childrenDelete then raise(fail, 'SUB_TODO_NOT_FINISH')
            else 1
        end
	begin
    	update todo set childrenFinish = (select count(1) from todo where parentId = new.parentId and isFinish = 1 and isDelete = 0) where id = new.parentId;
    end;

drop trigger if exists onTodoUpdateChildrenFinish;

create trigger onTodoUpdateChildrenFinish after update of childrenCount, childrenFinish on todo
    when new.childrenCount > new.childrenFinish and old.childrenCount = old.childrenFinish
    begin
        update todo set isFinish = 0 where id = new.id;
    end;

drop trigger if exists onTodoUpdateIsDelete;

create trigger onTodoUpdateIsDelete after update of isDelete on todo
    when new.isDelete != old.isDelete
    begin
        update todo set childrenFinish = (select count(1) from todo where parentId = new.parentId and isFinish = 1 and isDelete = 0) where id = new.parentId;
        update todo set childrenDelete = (select count(1) from todo where parentId = new.parentId and isDelete = 1) where id = new.parentId;
    end;

drop trigger if exists onTodoUpdateIsAncestorDelete;

create trigger onTodoUpdateIsAncestorDelete after update of isDelete, isAncestorDelete on todo
    when (new.isDelete != old.isDelete or new.isAncestorDelete != old.isAncestorDelete) and (new.isAncestorDelete + new.isDelete > 0) != (old.isAncestorDelete + old.isDelete > 0)
    begin
        update todo set isAncestorDelete = 0 where parentId = new.id and new.isAncestorDelete + new.isDelete = 0;
        update todo set isAncestorDelete = 1 where parentId = new.id and new.isAncestorDelete + new.isDelete > 0;
    end;

drop trigger if exists onTodoUpdatePriority;

create trigger onTodoUpdatePriority after update of isFinish, isDelete, priority, childrenPriority on todo
    when new.isFinish != old.isFinish or new.isDelete != old.isDelete or (new.isFinish = 0 and new.isDelete = 0 and (new.priority != old.priority or new.childrenPriority != old.childrenPriority))
    begin
        update or replace todo set childrenPriority = (select max(max(priority, childrenPriority)) from todo where parentId = new.parentId and isFinish = 0 and isDelete = 0) where id = new.parentId;
    end;

drop trigger if exists onTodoDelete;

create trigger onTodoDelete after delete on todo
	begin
        delete from todo where parentId = old.id;
    	delete from todo_closure where idDescendant in (select idDescendant from (select idDescendant from todo_closure where idAncestor = old.id)) and idAncestor in (select idAncestor from (select idAncestor from todo_closure where idDescendant = old.id));
        update todo set childrenCount = (select count(1) from todo where parentId = old.parentId) where id = old.parentId;
        update todo set childrenFinish = (select count(1) from todo where parentId = old.parentId and isFinish = 1 and isDelete = 0) where id = old.parentId;
        update todo set childrenDelete = (select count(1) from todo where parentId = old.parentId and isDelete = 1) where id = old.parentId;
    end;

drop trigger if exists onTodoDeleteIsDelete;

create trigger onTodoDeleteIsDelete after delete on todo
    when old.isDelete = 0
    begin
        update todo set childrenCount = (select count(1) from todo where parentId = old.parentId) where id = old.parentId;
        update todo set childrenDelete = (select count(1) from todo where parentId = old.parentId and isDelete = 1) where id = old.parentId;
    end;

drop trigger if exists onListInsert;

create trigger onListInsert after insert on list
    when
        case
            when (select isGroup from list where id = new.parentId) != 1 then raise(fail, 'LIST_PARENT_NOT_GROUP')
            else 1
        end
	begin
        insert into list_closure (idAncestor, idDescendant, length) select idAncestor, new.id, length + 1 from list_closure where idDescendant = new.parentId union all select new.id, new.id, 0;
    end;

drop trigger if exists onListNotGroupInsert;

create trigger onListNotGroupInsert after insert on list
    when new.isGroup = 0
    begin
        insert into todo (content, parentId, listId) values ('Home', -1, new.id);
    end;

drop trigger if exists onListUpdate;

create trigger onListUpdate after update of parentId, title, isDelete on list
    when 
        case 
            when old.isDelete = new.isDelete and new.isDelete = 1 then raise(fail, 'LIST_ALREADY_DELETE')
            when old.parentId != new.parentId or old.title != new.title or old.isDelete != new.isDelete then 1
            else 0
        end
    begin
        update list set updatedAt = CURRENT_TIMESTAMP where id = new.id;
    end;

drop trigger if exists onListUpdateParentId;

create trigger onListUpdateParentId after update of parentId on list
    when new.parentId != old.parentId
    begin
        delete from list_closure where idDescendant in (select idDescendant from (select idDescendant from list_closure where idAncestor = new.id)) and idAncestor in (select idAncestor from (select idAncestor from list_closure where idDescendant = new.id and idAncestor != idDescendant));
        insert into list_closure (idAncestor, idDescendant, length) select p_tree.idAncestor, c_tree.idDescendant, p_tree.length + c_tree.length + 1 from list_closure p_tree cross join list_closure c_tree where p_tree.idDescendant = new.parentId and c_tree.idAncestor = new.id;
    end;

drop trigger if exists onListDelete;

create trigger onListDelete after delete on list
    begin
        delete from list_closure where idDescendant in (select idDescendant from (select idDescendant from list_closure where idAncestor = old.id)) and idAncestor in (select idAncestor from (select idAncestor from list_closure where idDescendant = old.id));
    end;

drop trigger if exists onListIsGroupDelete;

create trigger onListIsGroupDelete after delete on list
    begin
        delete from list where id in (select idDescendant from list_closure where idAncestor = old.id);
    end;

drop trigger if exists onListNotGroupDelete;

create trigger onListNotGroupDelete after delete on list
    when old.isGroup = 0
    begin
        delete from todo where listId = old.id;
    end;

`;

export const initData: string = `

-- [DATA]

insert into list (title, parentId, isGroup) values ('ROOT', -1, 1);
insert into list (title, parentId) values ('default list', (select id from list where parentId = -1));

`;
