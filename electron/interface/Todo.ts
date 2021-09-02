export interface IHasId {
    id: number
}

export interface IHasContent {
    content: string
}

export interface IHasComment {
    comment: string
}

export interface IHasTimeStamp {
    createdAt: Date,
    updatedAt: Date,
}

export interface IIsFinish {
    isFinish: boolean
}

export interface IIsDelete {
    isDelete: boolean
}

export interface IIsAncestorDelete {
    isAncestorDelete: boolean
}

export interface IHasPriority {
    priority: number
}

export interface IHasParentId {
    parentId: number
}

export interface IHasChildrenCount {
    childrenCount: number,
}

export interface IHasChildrenFinish {
    childrenFinish: number,
}

export interface IHasChildrenDelete {
    childrenDelete: number,
}

export interface IHasChildrenPriority {
    childrenPriority: number
}

export enum TodoStatus {
    DOING,
    DONE,
    DELETED
}

export interface ITodoStatus {
    status: TodoStatus
}

export interface ITodoStat extends IHasChildrenCount, IHasChildrenFinish, IHasChildrenDelete {}

export interface ITodoList extends IHasParentId, ITodoStatus {}

export interface ITodoInsert extends IHasContent, IHasParentId {}

export interface ITodoHasIdContent extends IHasId, IHasContent {}

export interface ITodoHasIdComment extends IHasId, IHasComment {}

export interface ITodoUpdateIsFinish extends IHasId, IIsFinish {}

export interface ITodoUpdateIsDelete extends IHasId, IIsDelete {}

export interface ITodoUpdateParentId extends IHasId, IHasParentId {}

export interface ITodoUpdatePriority extends IHasId, IHasPriority {}

export type ITodoDuplicate = ITodoUpdateParentId;

export interface ITodo extends IHasId, IHasContent, IHasComment, IHasTimeStamp, IIsFinish, IIsDelete, IIsAncestorDelete, IHasPriority, IHasParentId, IHasChildrenPriority, ITodoStat {
    
}

export interface ITodoClosure {
    idAncestor: number,
    idDescendant: number,
    length: number
}

export const todoCanFinish = (todo: ITodo) => {
    const {isDelete, childrenCount, childrenFinish, childrenDelete} = todo;
    return !isDelete && (childrenCount === 0 ? true : childrenCount == childrenFinish + childrenDelete);
}
