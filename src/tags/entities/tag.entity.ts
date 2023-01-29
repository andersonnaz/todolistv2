import { Task } from "src/tasks/entities/task.entity";
import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
@Entity('tags')
export class Tag {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @ManyToMany(() => Task, (task) => task.tags)
    tasks: Task[]

    @CreateDateColumn({type: 'timestamp'})
    created_at: Date;

    @CreateDateColumn({type: 'timestamp'})
    deleted_at: Date;
}