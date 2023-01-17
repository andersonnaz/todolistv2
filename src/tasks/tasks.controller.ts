import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { identity } from 'rxjs';

@Controller('tasks')
export class TasksController {
    @Get()
    findAll(){
        return {message: 'all tasks'};
    }

    @Post()
    create(@Body() body) {
        return {body};
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
