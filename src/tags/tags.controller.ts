import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { TagsService } from './tags.service';

@ApiTags('Tags')
@Controller('tags')
export class TagsController {
    constructor(private readonly tagsService: TagsService){}

    @Get()
    findAll(){
        return this.tagsService.findAll();
    }

    @Get(':id')
    async findById(@Param('id') id: string){
        try {
            const result = await this.tagsService.findById(id);
            return result;
        } catch (error) {
            return error;
        }
    }

    @Post()
    async create(@Body() createTagDto: CreateTagDto){
        try {
            const result = await this.tagsService.create(createTagDto);
            return result;
        } catch (error) {
            return error;
        }
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateTagDto: UpdateTagDto){
        try {
            const result = await this.tagsService.update(id, updateTagDto);
            return result;
        } catch (error) {
            return error;
        }
    }

    @Delete(':id')
    async remove(@Param('id') id: string){
        try {
            const result = await this.tagsService.remove(id);
            return result;
        } catch (error) {
            return error;
        }
    }

}
