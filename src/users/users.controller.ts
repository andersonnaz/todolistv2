import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService){}

    @Get()
    findAll(){
        return this.userService.findAll();
    }

    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        try {
            const result = await this.userService.create(createUserDto);
            return result;
        } catch (error) {
            return error;
        }
    }

    @Put(':id')
    async update(@Param('id') id, @Body() updateUserDto: UpdateUserDto) {
        try {
            const result = await this.userService.update(id, updateUserDto);
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
