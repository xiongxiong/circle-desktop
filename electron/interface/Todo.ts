export interface IHasId {
    id: number
}

export interface IHasContent {
    content: string
}

export interface IHasComment {
    comment: string
}

export interface IHasParentId {
    parentId: number
}

export interface IIsFinish {
    isFinish: boolean
}

export interface IIsDelete {
    isDelete: boolean
}

export interface IHasPriority {
    priority: number
}

export interface ITodoStat {
    childrenCount: number,
    childrenFinish: number,
}

export interface ITodoList extends IHasParentId, IIsFinish {}

export interface ITodoInsert extends IHasContent, IHasParentId {}

export interface ITodoHasIdContent extends IHasId, IHasContent {}

export interface ITodoHasIdComment extends IHasId, IHasComment {}

export interface ITodoUpdateIsFinish extends IHasId, IIsFinish {}

export interface ITodoUpdateIsDelete extends IHasId, IIsDelete {}

export interface ITodoUpdateParentId extends IHasId, IHasParentId {}

export interface ITodoUpdatePriority extends IHasId, IHasPriority {}

export type ITodoDuplicate = ITodoUpdateParentId;

export interface ITodo extends IHasId, IHasContent, IHasComment, IHasParentId, IIsFinish, IIsDelete, IHasPriority, ITodoStat {
    createdAt: Date,
    updatedAt: Date,
}

export interface ITodoClosure {
    idAncestor: number,
    idDescendant: number,
    length: number
}
