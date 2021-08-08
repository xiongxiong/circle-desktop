export interface IHasContent {
    content: string
}

export interface ITodoNew extends IHasContent {
    parent?: ITodo
}

export interface ITodoNavNode extends IHasContent {
    id: number,
}

export interface ITodo extends ITodoNew, ITodoNavNode {
    children: ITodo[],
    createdAt: Date,
    updatedAt: Date
}
