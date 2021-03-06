import {ITodoDuplicate, IHasId, ITodoInsert, ITodoUpdate, ITodoSearch, IListSearch, ITodoDelete, IListInsert, IListUpdate, IListDelete, IHasListId, OHasListId, OHasContent} from './Data'

export interface IBridgeMsg {
    channel: string,
    message: any
}

export interface IDialogActionMsg {
    action: DialogActions,
    body: any
}

export interface IDialogButtonProps {
    label: string,
    func: () => void
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

export interface IDataActionMsg {
    action: DataActions,
    body?: any
}

export enum DataActions {
    TodoSelectList = "TodoSelectList",
    TodoSelect = "TodoSelect",
    TodoSelectRoot = "TodoSelectRoot",
    TodoSelectStat = "TodoSelectStat", // 查询所有待办的统计信息
    TodoSelectAncestorList = "TodoSelectAncestorList",
    TodoInsert = "TodoInsert",
    TodoDuplicate = "TodoDuplicate",
    TodoUpdate = "TodoUpdate",
    TodoDelete = "TodoDelete",
    ListTreeSelect = "ListTreeSelect",
    ListNodeSelect = "ListNodeSelect",
    ListInsert = "ListInsert",
    ListUpdate = "ListUpdate",
    ListDelete = "ListDelete",
}

abstract class DataMsg implements IBridgeMsg {
    readonly channel: string = 'data';
    message: IDataActionMsg;
}

export class MsgTodoSelectList extends DataMsg {
    constructor(data: ITodoSearch) {
        super();
        this.message = {
            action: DataActions.TodoSelectList,
            body: data
        };
    }
}

export class MsgTodoSelect extends DataMsg {
    constructor(data: IHasId) {
        super();
        this.message = {
            action: DataActions.TodoSelect,
            body: data
        };
    }
}

export class MsgTodoSelectRoot extends DataMsg {
    constructor(data: IHasListId) {
        super();
        this.message = {
            action: DataActions.TodoSelectRoot,
            body: data
        };
    }
}

export class MsgTodoSelectStat extends DataMsg {
    constructor(data: OHasListId & OHasContent) {
        super();
        this.message = {
            action: DataActions.TodoSelectStat,
            body: data
        };
    }
}

export class MsgTodoSelectAncestorList extends DataMsg {
    constructor(data: IHasId) {
        super();
        this.message = {
            action: DataActions.TodoSelectAncestorList,
            body: data
        }
    }
}

export class MsgTodoInsert extends DataMsg {
    constructor(data: ITodoInsert) {
        super();
        this.message = {
            action: DataActions.TodoInsert,
            body: data
        };
    }
}

export class MsgTodoDuplicate extends DataMsg {
    constructor(data: ITodoDuplicate) {
        super();
        this.message = {
            action: DataActions.TodoDuplicate,
            body: data
        };
    }
}

export class MsgTodoUpdate extends DataMsg {
    constructor(data: ITodoUpdate) {
        super();
        this.message = {
            action: DataActions.TodoUpdate,
            body: data
        };
    }
}

export class MsgTodoDelete extends DataMsg {
    constructor(data: ITodoDelete) {
        super();
        this.message = {
            action: DataActions.TodoDelete,
            body: data
        };
    }
}

export class MsgListTreeSelect extends DataMsg {
    constructor() {
        super();
        this.message = {
            action: DataActions.ListTreeSelect,
            body: {}
        };
    }
}

export class MsgListNodeSelect extends DataMsg {
    constructor(data: IListSearch) {
        super();
        this.message = {
            action: DataActions.ListNodeSelect,
            body: data
        };
    }
}

export class MsgListInsert extends DataMsg {
    constructor(data: IListInsert) {
        super();
        this.message = {
            action: DataActions.ListInsert,
            body: data
        };
    }
}

export class MsgListUpdate extends DataMsg {
    constructor(data: IListUpdate) {
        super();
        this.message = {
            action: DataActions.ListUpdate,
            body: data
        };
    }
}

export class MsgListDelete extends DataMsg {
    constructor(data: IListDelete) {
        super();
        this.message = {
            action: DataActions.ListDelete,
            body: data
        };
    }
}