import { Tag } from "src/tags/entities/tag.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('tasks')
export class Task {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @JoinTable()
    @ManyToMany(() => Tag, (tag) => tag.tasks,{
        cascade: true
    })
    tags: Tag[];

    @ManyToOne(() => User, (user) => user.tasks)
    user: User;

    @Column()
    created_at: Date;

    @Column()
    deleted_at: Date;
}