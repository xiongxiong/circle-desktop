import {ITodoBasic, ITodoHasId, ITodoInsert, ITodoList, ITodoUpdateIsDelete, ITodoUpdateIsFinish, ITodoUpdatePriority} from './Todo'

export interface IBridgeMsg {
    channel: string,
    message: any
}

export interface IDialogActionMsg {
    action: DialogActions,
    body: any
}

export enum DialogActions {
    MessageBox = "MessageBox",
    ErrorBox = "ErrorBox"
}

abstract class MsgDialog implements IBridgeMsg {
    readonly channel: string = 'dialog';
    message: IDialogActionMsg;
}

export class MsgDialogMessageBox extends MsgDialog {
    constructor(options: Object) {
        super();
        this.message = {
            action: DialogActions.MessageBox,
            body: options
        };
    }
}

export class MsgDialogErrorBox extends MsgDialog {
    constructor(title: string, content: string) {
        super();
        this.message = {
            action: DialogActions.ErrorBox,
            body: {title, content}
        };
    }
}

export interface IMenuActionMsg {
    action: MenuActions,
    body: any
}

export enum MenuActions {
    ContextMenu = "ContextMenu"
}

abstract class MsgMenu implements IBridgeMsg {
    readonly channel: string = 'menu';
    message: IMenuActionMsg;
}

export class MsgMenuContextMenu extends MsgMenu {
    constructor(menuTemplate: Object[]) {
        super();
        this.message = {
            action: MenuActions.ContextMenu,
            body: menuTemplate
        };
    }
}

export interface ITodoActionMsg {
    action: TodoActions,
    body: any
}

export enum TodoActions {
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
    message: ITodoActionMsg;
}

export class MsgTodoSelectList extends MsgTodo {
    constructor(todo?: ITodoList) {
        super();
        this.message = {
            action: TodoActions.TodoSelectList,
            body: todo
        };
    }
}

export class MsgTodoSelect extends MsgTodo {
    constructor(todo?: ITodoHasId) {
        super();
        this.message = {
            action: TodoActions.TodoSelect,
            body: todo
        };
    }
}

export class MsgTodoInsert extends MsgTodo {
    constructor(todo: ITodoInsert) {
        super();
        this.message = {
            action: TodoActions.TodoInsert,
            body: todo
        };
    }
}

export class MsgTodoUpdateContent extends MsgTodo {
    constructor(todo: ITodoBasic) {
        super();
        this.message = {
            action: TodoActions.TodoUpdateContent,
            body: todo
        };
    }
}

export class MsgTodoUpdateIsFinish extends MsgTodo {
    constructor(todo: ITodoUpdateIsFinish) {
        super();
        this.message = {
            action: TodoActions.TodoUpdateIsFinish,
            body: todo
        };
    }
}

export class MsgTodoUpdateIsDelete extends MsgTodo {
    constructor(todo: ITodoUpdateIsDelete) {
        super();
        this.message = {
            action: TodoActions.TodoUpdateIsDelete,
            body: todo
        };
    }
}

export class MsgTodoUpdatePriority extends MsgTodo {
    constructor(todo: ITodoUpdatePriority) {
        super();
        this.message = {
            action: TodoActions.TodoUpdatePriority,
            body: todo
        };
    }
}

export class MsgTodoDelete extends MsgTodo {
    constructor(todo: ITodoHasId) {
        super();
        this.message = {
            action: TodoActions.TodoDelete,
            body: todo
        };
    }
}