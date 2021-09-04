import {ITodoDuplicate, IHasId, ITodoInsert, ITodoUpdate, ITodoSearch} from './Todo'

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
    body?: any
}

export enum TodoActions {
    TodoSelectList = "TodoSelectList",
    TodoSelect = "TodoSelect",
    TodoSelectStatAll = "TodoSelectStatAll", // 查询所有待办的统计信息
    TodoInsert = "TodoInsert",
    TodoDuplicate = "TodoDuplicate",
    TodoUpdate = "TodoUpdate",
    TodoDelete = "TodoDelete",
}

abstract class MsgTodo implements IBridgeMsg {
    readonly channel: string = 'todo';
    message: ITodoActionMsg;
}

export class MsgTodoSelectList extends MsgTodo {
    constructor(todo?: ITodoSearch) {
        super();
        this.message = {
            action: TodoActions.TodoSelectList,
            body: todo
        };
    }
}

export class MsgTodoSelect extends MsgTodo {
    constructor(todo?: IHasId) {
        super();
        this.message = {
            action: TodoActions.TodoSelect,
            body: todo
        };
    }
}

export class MsgTodoSelectStatAll extends MsgTodo {
    constructor() {
        super();
        this.message = {
            action: TodoActions.TodoSelectStatAll,
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

export class MsgTodoDuplicate extends MsgTodo {
    constructor(todo: ITodoDuplicate) {
        super();
        this.message = {
            action: TodoActions.TodoDuplicate,
            body: todo
        };
    }
}

export class MsgTodoUpdate extends MsgTodo {
    constructor(todo: ITodoUpdate) {
        super();
        this.message = {
            action: TodoActions.TodoUpdate,
            body: todo
        };
    }
}

export class MsgTodoDelete extends MsgTodo {
    constructor(todo: IHasId) {
        super();
        this.message = {
            action: TodoActions.TodoDelete,
            body: todo
        };
    }
}