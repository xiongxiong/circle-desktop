export interface ITodoHasId {
    id: number
}

export interface ITodoHasContent {
    content: string
}

export interface ITodoHasParentId {
    parentId?: number
}

export interface ITodoIsFinish {
    isFinish: boolean
}

export interface ITodoIsDelete {
    isDelete: boolean
}

export interface ITodoStat {
    childrenCount: number,
    childrenFinish: number,
}

export interface ITodoList extends ITodoHasParentId, ITodoIsFinish {}

export interface ITodoInsert extends ITodoHasContent, ITodoHasParentId {}

export interface ITodoBasic extends ITodoHasId, ITodoHasContent {}

export interface ITodoUpdateIsFinish extends ITodoHasId, ITodoIsFinish {}

export interface ITodoUpdateIsDelete extends ITodoHasId, ITodoIsDelete {}

export interface ITodoUpdate extends ITodoInsert, ITodoBasic, ITodoStat, ITodoUpdateIsFinish, ITodoUpdateIsDelete {}

export interface ITodo extends ITodoUpdate {
    createdAt: Date,
    updatedAt: Date,
    priority: number
}
