export interface ITodoHasId {
    id: number
}

export interface ITodoHasContent {
    content: string
}

export interface ITodoHasParentId {
    parentId?: number
}

export interface ITodoInsert extends ITodoHasContent, ITodoHasParentId {}

export interface ITodoBasic extends ITodoHasId, ITodoHasContent {}

export interface ITodoUpdate extends ITodoInsert, ITodoBasic {
    isFinish: boolean
}

export interface ITodo extends ITodoUpdate {
    createdAt: Date,
    updatedAt: Date,
    childrenCount: number,
    childrenFinish: number,
    level: number
}
