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

export interface ITodoList extends ITodoHasParentId, ITodoIsFinish {}

export interface ITodoInsert extends ITodoHasContent, ITodoHasParentId {}

export interface ITodoBasic extends ITodoHasId, ITodoHasContent {}

export interface ITodoUpdateIsFinish extends ITodoHasId, ITodoIsFinish {}

export interface ITodoUpdate extends ITodoInsert, ITodoBasic, ITodoUpdateIsFinish {}

export interface ITodo extends ITodoUpdate {
    createdAt: Date,
    updatedAt: Date,
    childrenCount: number,
    childrenFinish: number,
    level: number
}
