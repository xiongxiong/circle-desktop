export const initTable = 
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
    "isParentDelete" boolean NOT NULL DEFAULT (0),
    "childrenCount" integer NOT NULL DEFAULT (0),
    "childrenFinish" integer NOT NULL DEFAULT (0),
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

drop trigger if exists onTodoInsert;

create trigger onTodoInsert after insert on todo
	begin
    	update todo set childrenCount = childrenCount + 1 where id = new.parentId;
        insert into todo_closure (idAncestor, idDescendant, length) select idAncestor, new.id, length + 1 from todo_closure where idDescendant = new.parentId union all select new.id, new.id, 0;
    end;

drop trigger if exists onTodoUpdate;

create trigger onTodoUpdate after update of content, comment, createdAt, updatedAt, isFinish, childrenCount, childrenFinish, childrenPriority, priority, parentId on todo
    when case old.isDelete when 1 then raise(fail, 'Cannot update data that has been deleted') end
    begin
        update todo set updatedAt = CURRENT_TIMESTAMP where id = new.id;
    end;
    
drop trigger if exists onTodoUpdateParentId;

create trigger onTodoUpdateParentId after update of parentId on todo
    when new.parentId != old.parentId
	begin
    	delete from todo_closure where idDescendant in (select idDescendant from (select idDescendant from todo_closure where idAncestor = new.id)) and idAncestor in (select idAncestor from (select idAncestor from todo_closure where idDescendant = new.id and idAncestor != idDescendant));
        update todo set childrenCount = childrenCount - 1 where id = old.parentId;
        update todo set childrenFinish = childrenFinish - 1 where id = old.parentId and old.isFinish = 1;
    	insert into todo_closure (idAncestor, idDescendant, length) select p_tree.idAncestor, c_tree.idDescendant, p_tree.length + c_tree.length + 1 from todo_closure p_tree cross join todo_closure c_tree where p_tree.idDescendant = new.parentId and c_tree.idAncestor = new.id;
        update todo set childrenCount = childrenCount + 1 where id = new.parentId;
        update todo set childrenFinish = childrenFinish + 1 where id = new.parentId and new.isFinish = 1;
    end;

drop trigger if exists onTodoUpdateIsFinish;

create trigger onTodoUpdateIsFinish after update of isFinish on todo
    when new.isFinish != old.isFinish
	begin
    	update todo set childrenFinish = childrenFinish - 1 where id = new.parentId and 0 = new.isFinish;
        update todo set childrenFinish = childrenFinish + 1 where id = new.parentId and 1 = new.isFinish;
    end;

drop trigger if exists onTodoUpdateIsDelete;

create trigger onTodoUpdateIsDelete after update of isDelete on todo
    when new.isDelete != old.isDelete
    begin
        update todo set isParentDelete = 0 where parentId = new.id and 0 = new.isDelete and 0 = new.isParentDelete;
        update todo set isParentDelete = 1 where parentId = new.id and 1 = new.isDelete;
        update todo set childrenCount = childrenCount + 1 where id = new.parentId and 0 = new.isDelete;
        update todo set childrenCount = childrenCount - 1 where id = new.parentId and 1 = new.isDelete;
        update todo set childrenFinish = childrenFinish - 1 where id = new.parentId and 1 = new.isDelete and 1 = old.isFinish;
        update todo set childrenFinish = childrenFinish + 1 where id = new.parentId and 0 = new.isDelete and 1 = old.isFinish;
    end;

drop trigger if exists onTodoUpdateIsParentDelete;

create trigger onTodoUpdateIsParentDelete after update of isParentDelete on todo
    when new.isParentDelete != old.isParentDelete
    begin
        update todo set isParentDelete = 0 where parentId = new.id and 0 = new.isParentDelete and 0 = new.isDelete;
        update todo set isParentDelete = 1 where parentId = new.id and 1 = new.isParentDelete;
    end;

drop trigger if exists onTodoUpdatePriority;

create trigger onTodoUpdatePriority after update of priority on todo
    when new.priority > old.childrenPriority
    begin
        update todo set childrenPriority = (select max(max(priority, childrenPriority)) from todo where parentId = new.parentId) where id = new.parentId;
    end;

drop trigger if exists onTodoUpdateChildrenPriority;

create trigger onTodoUpdateChildrenPriority after update of childrenPriority on todo
    when new.childrenPriority > old.priority
    begin
        update todo set childrenPriority = (select max(max(priority, childrenPriority)) from todo where parentId = new.parentId) where id = new.parentId;
    end;
    
drop trigger if exists onTodoUpdateChildrenCount;

create trigger onTodoUpdateChildrenCount after update of childrenCount on todo
    when new.childrenCount != old.childrenCount
	begin
    	update todo set isFinish = 0 where id = new.id and childrenFinish < childrenCount;
        update todo set isFinish = 1 where id = new.id and childrenFinish = childrenCount;
    end;

drop trigger if exists onTodoUpdateChildrenFinish;

create trigger onTodoUpdateChildrenFinish after update of childrenFinish on todo
    when new.childrenFinish != old.childrenFinish
	begin
    	update todo set isFinish = 0 where id = new.id and childrenFinish < childrenCount;
        update todo set isFinish = 1 where id = new.id and childrenFinish = childrenCount;
    end;

drop trigger if exists onTodoDelete;

create trigger onTodoDelete after delete on todo
	begin
        delete from todo where parentId = old.id;
    	delete from todo_closure where idDescendant in (select idDescendant from (select idDescendant from todo_closure where idAncestor = old.id)) and idAncestor in (select idAncestor from (select idAncestor from todo_closure where idDescendant = old.id));
    end;

drop trigger if exists onTodoDeleteIsDelete;

create trigger onTodoDeleteIsDelete after delete on todo
    when old.isDelete = 0
    begin
        update todo set childrenCount = childrenCount - 1 where id = old.parentId;
        update todo set childrenFinish = childrenFinish - 1 where id = old.parentId and old.isFinish = 1;
    end;

`

export const initData = `

-- [DATA]

insert into todo (id, content, createdAt, updatedat, parentId) values (0, 'Home', 0, 0, -1);

`
