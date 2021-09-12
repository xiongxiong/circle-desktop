// IBasic

export interface IHasId {
    id: number
}

export interface OHasId {
    id?: number
}

export interface IHasParentId {
    parentId: number
}

export interface OHasParentId {
    parentId?: number
}

export interface IHasListId {
    listId: number
}

export interface OHasListId {
    listId?: number
}

export interface IIsGroup {
    isGroup: number
}

export interface OIsGroup {
    isGroup?: boolean
}

export interface IHasTitle {
    title: string
}

export interface OHasTitle {
    title?: string
}

export interface IHasContent {
    content: string
}

export interface OHasContent {
    content?: string
}

export interface IHasComment {
    comment: string
}

export interface OHasComment {
    comment?: string
}

export interface IHasTimeStamp {
    createdAt: Date,
    updatedAt: Date,
}

export interface OHasTimeStamp {
    createdAt?: Date,
    updatedAt?: Date,
}

export interface IIsFinish {
    isFinish: boolean
}

export interface OIsFinish {
    isFinish?: boolean
}

export interface IIsDelete {
    isDelete: boolean
}

export interface OIsDelete {
    isDelete?: boolean
}

export interface IIsAncestorDelete {
    isAncestorDelete: boolean
}

export interface OIsAncestorDelete {
    isAncestorDelete?: boolean
}

export interface IHasPriority {
    priority: number
}

export interface OHasPriority {
    priority?: number
}

export interface IHasChildrenCount {
    childrenCount: number,
}

export interface OHasChildrenCount {
    childrenCount?: number,
}

export interface IHasChildrenFinish {
    childrenFinish: number,
}

export interface OHasChildrenFinish {
    childrenFinish?: number,
}

export interface IHasChildrenDelete {
    childrenDelete: number,
}

export interface OHasChildrenDelete {
    childrenDelete?: number,
}

export interface IHasChildrenPriority {
    childrenPriority: number
}

export interface OHasChildrenPriority {
    childrenPriority?: number
}

// ITodo

export enum TodoStatus {
    DOING,
    DONE,
    DELETED
}

export interface ITodoStatus {
    status: TodoStatus
}

export interface OTodoStatus {
    status?: TodoStatus
}

export interface ITodoSearch extends ITodoStatus, IHasListId, OHasContent, OHasParentId {}

export interface ITodoStat extends IHasChildrenCount, IHasChildrenFinish, IHasChildrenDelete {}

export interface ITodoInsert extends IHasListId, IHasContent, OHasParentId {}

export interface ITodoUpdate extends IHasId, OHasParentId, OHasContent, OHasComment, OIsFinish, OIsDelete, OHasPriority {}

export interface ITodoDelete extends IHasId {}

export interface ITodoDuplicate extends IHasId, IHasParentId {}

export interface ITodoBasic extends IHasId, IHasContent {}

export interface ITodo extends IHasId, IHasParentId, IHasListId, IHasContent, IHasComment, IHasTimeStamp, IIsFinish, IIsDelete, IIsAncestorDelete, IHasPriority, IHasChildrenPriority, ITodoStat {}

export interface ITodoClosure {
    idAncestor: number,
    idDescendant: number,
    length: number
}

// IList

export interface IListSearch extends IHasParentId {}

export interface IListInsert extends IHasTitle, OHasParentId, OIsGroup {}

export interface IListUpdate extends IHasId, OHasTitle, OHasParentId, OIsDelete {}

export interface IListDelete extends IHasId {}

export interface IListBasic extends IHasId, IHasParentId, IHasTitle, IIsGroup {}

export interface IList extends IHasId, IHasParentId, IHasTitle, IHasTimeStamp, IIsGroup, IIsDelete {}

// helper functions

export const todoCanFinish = (todo: ITodo) => {
    const {isDelete, childrenCount, childrenFinish, childrenDelete} = todo;
    return !isDelete && (childrenCount === 0 ? true : childrenCount == childrenFinish + childrenDelete);
}
