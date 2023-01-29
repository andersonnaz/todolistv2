import { Task } from "src/tasks/entities/task.entity";
import { Column, CreateDateColumn, Entity, JoinTable, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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
        onDelete: "CASCADE"
    })
    tasks: Task[];

    @CreateDateColumn({type: 'timestamp'})
    created_at: Date;

    @CreateDateColumn({type: 'timestamp'})
    deleted_at: Date;
}