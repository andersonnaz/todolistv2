import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService){}

    @Get()
    findAll(){
        return this.tasksService.findAll();
    }

    @Post()
    async create(@Body() createTaskDto: CreateTaskDto) {
        try {
            const result = await this.tasksService.create(createTaskDto);
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
    update(@Param('id') id : string, @Body() updateTaskDto: UpdateTaskDto){
        return {id, updateTaskDto}
    }

    @Delete(':id')
    remove(@Param('id') id : string){
        return `delete ${id}`
    }



}
