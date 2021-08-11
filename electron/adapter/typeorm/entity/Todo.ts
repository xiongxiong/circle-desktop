import {Entity, Tree, Column, PrimaryGeneratedColumn, TreeChildren, TreeParent, TreeLevelColumn} from "typeorm";

@Entity({name: 't_todo'})
@Tree("closure-table")
export class Todo {

    @PrimaryGeneratedColumn({name: 'c_id'})
    id: number;

    @Column({name: 'c_content'})
    content: string;

    @Column({name: 'c_created_at'})
    createdAt: Date;

    @Column({name: 'c_updated_at'})
    updatedAt: Date;

    @Column({name: 'c_children_count'})
    childrenCount: number;

    @TreeChildren()
    children?: Todo[];

    @TreeParent({onDelete: 'CASCADE'})
    parent?: Todo;
}