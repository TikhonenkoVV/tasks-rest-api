import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/users/schemas/users/User.schema';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { UpdateUserDto } from 'src/users/dtos/UpdateUser.dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async createUser(createUserDto: CreateUserDto): Promise<UserDocument> {
        const newUser = new this.userModel(createUserDto);
        return newUser.save();
    }

    async getCurrent(email: string): Promise<UserDocument> {
        return this.userModel.findOne({ email }).exec();
    }

    // getUsers() {
    //     return this.userModel.find();
    // }

    async getUserById(id: string): Promise<UserDocument> {
        return this.userModel.findById(id).exec();
    }

    async updateUser(
        userId: string,
        updateUserDto: UpdateUserDto
    ): Promise<UserDocument> {
        return this.userModel
            .findByIdAndUpdate(userId, updateUserDto, {
                new: true,
            })
            .exec();
    }

    async deleteUser(id: string): Promise<UserDocument> {
        return this.userModel.findByIdAndDelete(id).exec();
    }
}
