import {ITodoNew} from './Todo'

export interface IBridgeMsg {
    channel: string,
    message: IActionMsg
}

export interface IActionMsg {
    action: string,
    body: any
}

export enum Actions {
    TodoNew = "TodoNew",
    TodoList = "TodoList"
}

abstract class MsgTodo implements IBridgeMsg {
    readonly channel: string = 'todo';
    message: IActionMsg;
}

export class MsgTodoNew extends MsgTodo {
    constructor(todoNew: ITodoNew) {
        super();
        const now = Date.now();
        this.message = {
            action: Actions.TodoNew,
            body: {...todoNew, createdAt: now, updatedAt: now}
        };
    }
}

export class MsgTodoList extends MsgTodo {
    constructor() {
        super();
        this.message = {
            action: Actions.TodoList,
            body: undefined
        };
    }
}