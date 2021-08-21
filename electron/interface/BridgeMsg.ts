import {ITodo, ITodoBasic, ITodoHasId, ITodoHasParentId, ITodoInsert, ITodoList, ITodoUpdateIsDelete, ITodoUpdateIsFinish, ITodoUpdatePriority} from './Todo'

export interface IBridgeMsg {
    channel: string,
    message: IActionMsg
}

export interface IActionMsg {
    action: string,
    body: any
}

export enum Actions {
    TodoSelectList = "TodoSelectList",
    TodoSelect = "TodoSelect",
    TodoInsert = "TodoInsert",
    TodoUpdateContent = "TodoUpdate",
    TodoUpdateIsFinish = "TodoUpdateIsFinish",
    TodoUpdateIsDelete = "TodoUpdateIsDelete",
    TodoUpdatePriority = "TodoUpdatePriority",
    TodoDelete = "TodoDelete",
}

abstract class MsgTodo implements IBridgeMsg {
    readonly channel: string = 'todo';
    message: IActionMsg;
}

export class MsgTodoSelectList extends MsgTodo {
    constructor(todo?: ITodoList) {
        super();
        this.message = {
            action: Actions.TodoSelectList,
            body: todo
        };
    }
}

export class MsgTodoSelect extends MsgTodo {
    constructor(todo?: ITodoHasId) {
        super();
        this.message = {
            action: Actions.TodoSelect,
            body: todo
        };
    }
}

export class MsgTodoInsert extends MsgTodo {
    constructor(todo: ITodoInsert) {
        super();
        this.message = {
            action: Actions.TodoInsert,
            body: todo
        };
    }
}

export class MsgTodoUpdateContent extends MsgTodo {
    constructor(todo: ITodoBasic) {
        super();
        this.message = {
            action: Actions.TodoUpdateContent,
            body: todo
        };
    }
}

export class MsgTodoUpdateIsFinish extends MsgTodo {
    constructor(todo: ITodoUpdateIsFinish) {
        super();
        this.message = {
            action: Actions.TodoUpdateIsFinish,
            body: todo
        };
    }
}

export class MsgTodoUpdateIsDelete extends MsgTodo {
    constructor(todo: ITodoUpdateIsDelete) {
        super();
        this.message = {
            action: Actions.TodoUpdateIsDelete,
            body: todo
        };
    }
}

export class MsgTodoUpdatePriority extends MsgTodo {
    constructor(todo: ITodoUpdatePriority) {
        super();
        this.message = {
            action: Actions.TodoUpdatePriority,
            body: todo
        };
    }
}

export class MsgTodoDelete extends MsgTodo {
    constructor(todo: ITodoHasId) {
        super();
        this.message = {
            action: Actions.TodoDelete,
            body: todo
        };
    }
}