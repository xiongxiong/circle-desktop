
drop table if exists "todo";

CREATE TABLE "todo" (
    "id" integer NOT NULL,
    "content" varchar NOT NULL,
    "createdAt" datetime NOT NULL,
    "updatedAt" datetime NOT NULL,
    "isFinish" boolean NOT NULL DEFAULT (0),
    "childrenCount" integer NOT NULL DEFAULT (0),
    "childrenFinish" integer NOT NULL DEFAULT (0),
    "priority" integer NOT NULL DEFAULT (0),
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

drop trigger if exists onTodoInsert;

create trigger onTodoInsert after insert on todo
	begin
    	update todo set childrenCount = childrenCount + 1 where id = new.parentId;
        insert into todo_closure (idAncestor, idDescendant, length) select idAncestor, new.id, length + 1 from todo_closure where idDescendant = new.parentId union all select new.id, new.id, 0;
    end;
    
drop trigger if exists onTodoUpdateParentId;

create trigger onTodoUpdateParentId after update of parentId on todo
	begin
    	delete from todo_closure where idDescendant in (select idDescendant from (select idDescendant from todo_closure where idAncestor = new.id)) and idAncestor in (select idAncestor from (select idAncestor from todo_closure where idDescendant = new.id and idAncestor != idDescendant));
    	insert into todo_closure (idAncestor, idDescendant, length) select p_tree.idAncestor, c_tree.idDescendant, p_tree.length + c_tree.length + 1 from todo_closure p_tree cross join todo_closure c_tree where p_tree.idDescendant = new.parentId and c_tree.idAncestor = new.id;
    end;

drop trigger if exists onTodoUpdateisFinish;

create trigger onTodoUpdateisFinish after update of isFinish on todo
	begin
    	update todo set childrenFinish = childrenFinish - 1 where id = new.parentId and 0 = new.isFinish;
        update todo set childrenFinish = childrenFinish + 1 where id = new.parentId and 1 = new.isFinish;
    end;
    
drop trigger if exists onTodoUpdateChildrenCount;

create trigger onTodoUpdateChildrenCount after update of childrenCount on todo
	begin
    	update todo set isFinish = 0 where id = new.id and childrenFinish < childrenCount;
        update todo set isFinish = 1 where id = new.id and childrenFinish = childrenCount;
    end;

drop trigger if exists onTodoUpdateChildrenFinish;

create trigger onTodoUpdateChildrenFinish after update of childrenFinish on todo
	begin
    	update todo set isFinish = 0 where id = id and childrenFinish < childrenCount;
        update todo set isFinish = 1 where id = id and childrenFinish = childrenCount;
    end;

drop trigger if exists onTodoDelete;

create trigger onTodoDelete after delete on todo
	begin
    	delete from todo_closure where idDescendant in (select idDescendant from (select idDescendant from todo_closure where idAncestor = old.id)) and idAncestor in (select idAncestor from (select idAncestor from todo_closure where idDescendant = new.id));
    end;



