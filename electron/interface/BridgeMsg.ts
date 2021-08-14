import {ITodo, ITodoHasId, ITodoHasParentId, ITodoInsert, ITodoUpdate, ITodoUpdateIsFinish} from './Todo'

export interface IBridgeMsg {
    channel: string,
    message: IActionMsg
}

export interface IActionMsg {
    action: string,
    body: any
}

export enum Actions {
    TodoInsert = "TodoInsert",
    TodoUpdate = "TodoUpdate",
    TodoUpdateIsFinish = "TodoUpdateIsFinish",
    TodoDelete = "TodoDelete",
    TodoSelectList = "TodoList"
}

abstract class MsgTodo implements IBridgeMsg {
    readonly channel: string = 'todo';
    message: IActionMsg;
}

export class MsgTodoSelectList extends MsgTodo {
    constructor(todo?: ITodoHasParentId) {
        super();
        this.message = {
            action: Actions.TodoSelectList,
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

export class MsgTodoDelete extends MsgTodo {
    constructor(todo: ITodoHasId) {
        super();
        this.message = {
            action: Actions.TodoDelete,
            body: todo
        };
    }
}