import { Tag } from "src/tags/entities/tag.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('tasks')
export class Task {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @JoinTable({name: 'tasks_tags'})
    @ManyToMany(() => Tag, (tag) => tag.tasks)
    tags: Tag[];

    @ManyToOne(() => User, (user) => user.tasks, {
        onDelete: "CASCADE"
    })
    user: User;

    @CreateDateColumn({type: 'timestamp'})
    created_at: Date;

    @CreateDateColumn({type: 'timestamp'})
    deleted_at: Date;
}