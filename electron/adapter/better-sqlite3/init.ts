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
    "parentId" integer NOT NULL DEFAULT (0),
    PRIMARY KEY("id" AUTOINCREMENT)
);

drop table if exists "todo_closure";

CREATE TABLE "todo_closure" (
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

create trigger onTodoUpdate after update of content, comment, isFinish, isDelete, priority, parentId on todo
    when 
        case 
            when old.isDelete = new.isDelete and new.isDelete = 1 then raise(fail, 'TODO_ALREADY_DELETE')
            when old.isFinish = new.isFinish and new.isFinish = 1 then raise(fail, 'TODO_ALREADY_FINISH')
            else 1
        end
    begin
        update todo set updatedAt = CURRENT_TIMESTAMP where id = new.id;
    end;
    
drop trigger if exists onTodoUpdateParentId;

create trigger onTodoUpdateParentId after update of parentId on todo
    when new.parentId != old.parentId
	begin
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
            when new.isFinish = 1 and new.childrenCount > new.childrenFinish then raise(fail, 'SUB_TODO_NOT_FINISH')
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

drop trigger if exists onTodoUpdatePriorityToUpper;

create trigger onTodoUpdatePriorityToUpper after update of priority on todo
    when new.priority > old.priority
    begin
        update todo set childrenPriority = max(childrenPriority, new.priority) where id in (select idAncestor from todo_closure where idDescendant = new.id and length > 0);
    end;

drop trigger if exists onTodoUpdatePriorityToLower;

create trigger onTodoUpdatePriorityToLower after update of priority, childrenPriority on todo
    when new.priority < old.priority or new.childrenPriority < old.childrenPriority
    begin
        update todo set childrenPriority = (select max(max(priority, childrenPriority)) from todo where parentId = new.parentId) where id = new.parentId;
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

`;

export const initData: string = `

-- [DATA]

insert into todo (id, content, parentId) values (0, 'Home', -1);

`;
