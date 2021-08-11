import {ITodo, ITodoNew} from './Todo'

export interface IBridgeMsg {
    channel: string,
    message: IActionMsg
}

export interface IActionMsg {
    action: string,
    body: any
}

export enum Actions {
    TodoCreate = "TodoCreate",
    TodoUpdate = "TodoUpdate",
    TodoDelete = "TodoDelete",
    TodoList = "TodoList"
}

abstract class MsgTodo implements IBridgeMsg {
    readonly channel: string = 'todo';
    message: IActionMsg;
}

export class MsgTodoCreate extends MsgTodo {
    constructor(todoNew: ITodoNew) {
        super();
        const now = Date.now();
        this.message = {
            action: Actions.TodoCreate,
            body: {...todoNew, createdAt: now, updatedAt: now}
        };
    }
}

export class MsgTodoUpdate extends MsgTodo {
    constructor(todo: ITodo) {
        super();
        const now = Date.now();
        this.message = {
            action: Actions.TodoUpdate,
            body: {...todo, updatedAt: now}
        };
    }
}

export class MsgTodoDelete extends MsgTodo {
    constructor(todo: ITodo) {
        super();
        this.message = {
            action: Actions.TodoDelete,
            body: todo
        };
    }
}

export class MsgTodoList extends MsgTodo {
    constructor(todo?: ITodo) {
        super();
        this.message = {
            action: Actions.TodoList,
            body: todo
        };
    }
}