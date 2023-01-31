import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
    constructor(
        @Inject('USERS_REPOSITORY')
        private readonly userRepository: Repository<User>
    ){}

    findAll(){
        return this.userRepository.find({
            relations: ['tasks']
        });
    }

    async create(body: any){
        const user = {
            created_at: new Date(),
            deleted_at: new Date(),
            ...body
        }

        const result = await this.userRepository.create(user);
        return this.userRepository.save(result);
    }

    async update(id: string, body: any){
        const result = await this.userRepository.findOne({where: {id}});
        if(!result){
            return new NotFoundException('user not found');
        }
        const user = await this.userRepository.preload({
            id,
            ...body
        });
        return this.userRepository.save(user);
    }

    async findById(id: string){
        const user = await this.userRepository.findOne({where: {id}});
        if(!user){
            return new NotFoundException('user not found');
        }
        return user;
    }

    async remove(id: string){
        const user = await this.userRepository.findOne({where: {id}});
        if(!user){
            return new NotFoundException('user not found');
        }
        return this.userRepository.delete(id);
    }
}
