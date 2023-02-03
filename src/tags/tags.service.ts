import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './entities/tag.entity';

@Injectable()
export class TagsService {
    constructor(
        @Inject('TAGS_REPOSITORY')
        private readonly tagRepository: Repository<Tag>
    ){}

    findAll(){
        return this.tagRepository.find();
    }

    async findById(id: string){
        const user = await this.tagRepository.findOne({where: {id}});
        if(!user){
            throw new NotFoundException('tag not found');
        }
        return user;
    }

    async create(createTagDto: CreateTagDto){
        const result = await this.tagRepository.findOne({where: {name: createTagDto.name}});
        if(result){
            return {message: 'tag already exists'};
        }
        const tag = await this.tagRepository.create({
            ...createTagDto
        });
        return this.tagRepository.save(tag);
    }

    async update(id: string, updateTagDto: UpdateTagDto){
        const tag = await this.tagRepository.findOne({where: {id}});
        if(!tag){
            throw new  NotFoundException('tag not found');
        }
        const result = await this.tagRepository.preload({
            id,
            ...updateTagDto
        });
        return this.tagRepository.save(result);
    }

    async remove(id: string){
        const tag = await this.tagRepository.findOne({where: {id}});
        if(!tag){
            throw new NotFoundException('tag not found');
        }
        return this.tagRepository.delete(id);
    }
    
}
