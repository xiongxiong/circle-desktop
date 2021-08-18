import {ITodo, ITodoHasId, ITodoHasParentId, ITodoInsert, ITodoList, ITodoUpdate, ITodoUpdateIsDelete, ITodoUpdateIsFinish} from './Todo'

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
    TodoUpdate = "TodoUpdate",
    TodoUpdateIsFinish = "TodoUpdateIsFinish",
    TodoUpdateIsDelete = "TodoUpdateIsDelete",
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

export class MsgTodoUpdate extends MsgTodo {
    constructor(todo: ITodoUpdate) {
        super();
        this.message = {
            action: Actions.TodoUpdate,
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

export class MsgTodoDelete extends MsgTodo {
    constructor(todo: ITodoHasId) {
        super();
        this.message = {
            action: Actions.TodoDelete,
            body: todo
        };
    }
}