export interface ITodo {
    id: number,
    content: string,
    parent?: ITodo,
    children: ITodo[],
    createdAt: Date,
    updatedAt: Date
}

export interface ITodoNew {
    content: string
}