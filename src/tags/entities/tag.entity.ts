import { Task } from "src/tasks/entities/task.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
@Entity('tags')
export class Tag {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @ManyToMany(() => Task, (task) => task.tags)
    tasks: Task[]

    // @Column()
    // created_at: Date;

    // @Column()
    // deleted_at: Date;
}