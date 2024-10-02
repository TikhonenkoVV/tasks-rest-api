import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaskDto } from 'src/tasks/dtos/CreateTask.dto';
import { Task } from 'src/tasks/schemas/Task.schema';

@Injectable()
export class TasksService {
    constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

    async createTask(createTaskDto: CreateTaskDto) {
        const isMatch = await this.taskModel.findOne({
            owner: createTaskDto.owner,
            title: createTaskDto.title,
        });
        if (isMatch) {
            throw new HttpException('Card already exist.', 409);
        }
        const newTask = new this.taskModel(createTaskDto);
        return newTask.save();
    }
}
