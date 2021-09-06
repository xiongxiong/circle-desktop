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

export interface IHasGroupId {
    groupId: number
}

export interface OHasGroupId {
    groupId?: number
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

export interface ITodoSearch extends ITodoStatus, OHasContent, OHasParentId {}

export interface ITodoStat extends IHasChildrenCount, IHasChildrenFinish, IHasChildrenDelete {}

export interface ITodoInsert extends IHasContent, IHasParentId {}

export interface ITodoUpdate extends IHasId, OHasParentId, OHasContent, OHasComment, OIsFinish, OIsDelete, OHasPriority {}

export interface ITodoDelete extends IHasId {}

export interface ITodoHasIdContent extends IHasId, IHasContent {}

export interface ITodoDuplicate extends IHasId, IHasParentId {}

export interface ITodo extends IHasId, IHasParentId, IHasListId, IHasContent, IHasComment, IHasTimeStamp, IIsFinish, IIsDelete, IIsAncestorDelete, IHasPriority, IHasChildrenPriority, ITodoStat {}

export interface ITodoClosure {
    idAncestor: number,
    idDescendant: number,
    length: number
}

// IList

export interface IListSearch extends IHasGroupId {}

export interface IListInsert extends IHasTitle, OHasGroupId {}

export interface IListUpdate extends IHasId, OHasTitle, OHasGroupId, OIsDelete {}

export interface IListDelete extends IHasId {}

export interface IList extends IHasId, IHasGroupId, IHasTitle, IHasTimeStamp, IIsDelete {}

// IListGroup

export interface IListGroupSearch extends IHasParentId {}

export interface IListGroupInsert extends IHasTitle, OHasParentId {}

export interface IListGroupUpdate extends IHasId, OHasTitle, OHasParentId {}

export interface IListGroupDelete extends IHasId {}

export interface IListGroup extends IHasId, IHasParentId, IHasTitle, IHasTimeStamp {}

// helper functions

export const todoCanFinish = (todo: ITodo) => {
    const {isDelete, childrenCount, childrenFinish, childrenDelete} = todo;
    return !isDelete && (childrenCount === 0 ? true : childrenCount == childrenFinish + childrenDelete);
}
