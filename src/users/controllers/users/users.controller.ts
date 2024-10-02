import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    Param,
    Patch,
    Post,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import mongoose from 'mongoose';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { UpdateUserDto } from 'src/users/dtos/UpdateUser.dto';
import { UsersService } from 'src/users/srvices/users/users.service';

@Controller('api/users')
export class UsersController {
    constructor(private usersServices: UsersService) {}

    @Post('register')
    @UsePipes(new ValidationPipe())
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.usersServices.createUser(createUserDto);
    }

    // @Get()
    // getUsers() {
    //     return this.usersServices.getUsers();
    // }

    @Get(':id')
    getUserById(@Param('id') id: string) {
        const isValidId = mongoose.Types.ObjectId.isValid(id);
        if (!isValidId) throw new HttpException('User not found.', 404);
        const findedUser = this.usersServices.getUserById(id);
        if (!findedUser) throw new HttpException('User not found.', 404);
        return findedUser;
    }

    @Patch(':id')
    @UsePipes(new ValidationPipe())
    updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        const isValidId = mongoose.Types.ObjectId.isValid(id);
        if (!isValidId) throw new HttpException('Invalid id.', 400);
        const updatedUser = this.usersServices.updateUser(id, updateUserDto);
        if (!updatedUser) throw new HttpException('User not found', 404);
        return updatedUser;
    }

    @Delete(':id')
    deleteUser(@Param('id') id: string) {
        return this.usersServices.deleteUser(id);
    }
}
