import {Entity, Tree, Column, PrimaryGeneratedColumn, TreeChildren, TreeParent, TreeLevelColumn} from "typeorm";

export class Todo {

    id: number;

    content: string;

    createdAt: Date;

    updatedAt: Date;

    childrenCount: number;

    parent?: Todo;

    children?: Todo[];
}