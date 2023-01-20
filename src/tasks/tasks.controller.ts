import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TasksService } from './tasks.service';
@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService){}

    @Get()
    findAll(){
        return this.tasksService.findAll();
    }

    @Post()
    async create(@Body() body : any) {
        try {
            const result = await this.tasksService.create(body);
            return result;
        } catch (error) {
            return error;
        }
    }

    @Get(':id')
    findById(@Param('id') id : string){
        return {id}
    }

    @Put(':id')
    update(@Param('id') id : string, @Body() body){
        return {id, body}
    }

    @Delete(':id')
    remove(@Param('id') id : string){
        return `delete ${id}`
    }



}
