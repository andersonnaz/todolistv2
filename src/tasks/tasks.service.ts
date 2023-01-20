import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from 'src/tags/entities/tag.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private readonly taskRepository: Repository<Task>,

        @InjectRepository(Tag)
        private readonly tagRepository: Repository<Tag>,

        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ){}

    async findAll() {
        return this.taskRepository.find({
            relations: ['tags']
        });
    }

    async create(body: any){
        const user = await this.userRepository.findOne(body.user);
        if(!user){
            return new NotFoundException('user not found');
        }
        const tags = await Promise.all(
            body.tags.map((name) => {
                return this.preloadTagByName(name);
            })
        );
        const task = this.taskRepository.create({
            ...body,
            user,
            created_at: new Date(),
            deleted_at: new Date(),
            tags
        });
        return this.taskRepository.save(task);
    }

    private async preloadTagByName(name: string): Promise<Tag> {
        const tag = await this.tagRepository.findOne({name});
        if(tag){
            return tag;
        }
        return this.tagRepository.create({name});
    }
}
