

export class Todo {

    id: number;

    content: string;

    createdAt: Date;

    updatedAt: Date;

    isFinish: boolean;

    parentId?: number;

    childrenCount: number;

    childrenFinish: number;
}