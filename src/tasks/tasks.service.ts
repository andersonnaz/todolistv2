import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm'
import { Tag } from 'src/tags/entities/tag.entity';
import { User } from 'src/users/entities/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
    constructor(
        @Inject('TASKS_REPOSITORY')
        private readonly taskRepository: Repository<Task>,

        @Inject('TAGS_REPOSITORY')
        private readonly tagRepository: Repository<Tag>,

        @Inject('USERS_REPOSITORY')
        private readonly userRepository: Repository<User>
    ){}

    async findAll() {
        return this.taskRepository.find({
            relations: ['tags']
        });
    }

    async create(createTaskDto: CreateTaskDto){
        const user = await this.userRepository.findOne({
            where: {
                id: createTaskDto.user
            }
        });
        if(!user){
            return new NotFoundException('user not found');
        }
        const tags = await Promise.all(
            createTaskDto.tags.map((name) => {
                return this.preloadTagByName(name);
            })
        );
        const task = this.taskRepository.create({
            ...createTaskDto,
            user,
            tags
        });
        return this.taskRepository.save(task);
    }

    async findById(id: string){
        const user = await this.userRepository.findOne({where: {id}});
        if(!user){
            throw new NotFoundException('user not found');
        }
        return user;
    }

    async update(id: string, updateTaskDto: any){
        const task = await this.taskRepository.findOne({where: {id}});
        if(!task){
            throw new NotFoundException('task not found');
        }
        const result = await this.taskRepository.preload({
            id,
            ...updateTaskDto
        });
        return this.taskRepository.save(result);
    }

    async remove(id: string){
        const task = await this.taskRepository.findOne({where: {id}});
        if(!task){
            throw new NotFoundException('task not found');
        }
        return this.taskRepository.delete(id);
    }

    private async preloadTagByName(name: string): Promise<Tag> {
        const tag = await this.tagRepository.findOne({where: {name}});
        if(tag){
            return tag;
        }
        return this.tagRepository.create({name});
    }
}
