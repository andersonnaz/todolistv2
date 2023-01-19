import { Task } from "src/tasks/entities/task.entity";
import { Column, Entity, JoinTable, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @JoinTable()
    @OneToMany(() => Task, (task) => task.user, {
        cascade: true
    })
    tasks: Task[];

    @Column()
    created_at: Date;

    @Column()
    deleted_at: Date;
}