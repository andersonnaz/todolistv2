import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksService } from './tasks.service';

@ApiTags('Tasks')
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
            throw error;
        }
    }

    @Get(':id')
    async findById(@Param('id') id : string){
        try {
            const result = await this.tasksService.findById(id);
            return result;
        } catch (error) {
            throw error;
        }
    }

    @Put(':id')
    async update(@Param('id') id : string, @Body() updateTaskDto: UpdateTaskDto){
        try {
            const result = await this.tasksService.update(id, updateTaskDto);
            return result;
        } catch (error) {
            throw error;
        }
    }

    @Delete(':id')
    async remove(@Param('id') id : string){
        try {
            const result = await this.tasksService.remove(id);
            return result;
        } catch (error) {
            throw error;
        }
    }
}
