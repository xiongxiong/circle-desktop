export interface ITodo {
    id: number,
    content: string,
    parent?: ITodo,
    children: ITodo[]
}

export interface INewTodo {
    content: string
}

export interface ITodoService {
    open: () => void,
    close: () => void,
    selectList: () => ITodo[],
    create: (todo: INewTodo) => boolean,
}