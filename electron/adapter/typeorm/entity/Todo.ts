import {Entity, Tree, Column, PrimaryGeneratedColumn, TreeChildren, TreeParent, TreeLevelColumn} from "typeorm";

@Entity({name: 'todo'})
@Tree('closure-table', {ancestorColumnName: () => 'idAncestor', descendantColumnName: () => 'idDescendant'})
export class Todo {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;

    @Column({default: false})
    isFinish: boolean;

    @Column({default: 0})
    childrenCount: number;

    @Column({default: 0})
    childrenFinish: number;

    @TreeChildren()
    children?: Todo[];

    @TreeParent({onDelete: 'CASCADE'})
    parent?: Todo;

    @TreeLevelColumn()
    level: number;
}