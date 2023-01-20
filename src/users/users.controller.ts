import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { identity } from 'rxjs';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService){}

    @Get()
    findAll(){
        return this.userService.findAll();
    }

    @Post()
    async create(@Body() body) {
        try {
            const result = await this.userService.create(body);
            return result;
        } catch (error) {
            return error;
        }
    }

    @Put(':id')
    async update(@Param('id') id, @Body() body) {
        try {
            const result = await this.userService.update(id, body);
            return result;
        } catch (error) {
            return error;
        }
    }

    @Get(':id')
    async findById(@Param('id') id){
        try {
            const result = await this.userService.findById(id);
            return result;
        } catch (error) {
            return error;
        }
    }

    @Delete(':id')
    async remove(@Param('id') id) {
        try {
            const result = await this.userService.remove(id);
            return result;
        } catch (error) {
            return error;
        }
    }
}
