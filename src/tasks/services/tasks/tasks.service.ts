import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaskDto } from 'src/tasks/dtos/CreateTask.dto';
import { UpdateTaskDto } from 'src/tasks/dtos/UpdateTask.dto';
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
        newTask.save();
        return {
            status: 'create',
            code: 201,
            message: 'Task created successfully',
            task: newTask,
        };
    }

    async updateTask(id: string, owner: string, updateTaskDto: UpdateTaskDto) {
        const result = await this.taskModel.find({
            owner,
            title: updateTaskDto.title,
        });
        const isDuplicateTitle = result.filter(
            el => el._id.toString() !== id
        ).length;

        if (isDuplicateTitle) {
            throw new HttpException(
                'This task name already exists in this column',
                409
            );
        }

        const task = await this.taskModel
            .findByIdAndUpdate(id, updateTaskDto, {
                new: true,
                select: '-createdAt -updatedAt',
            })
            .exec();

        return {
            status: 'updated',
            code: 200,
            message: 'Task updated successfully',
            task: task,
        };
    }

    async deleteTask(id: string) {
        const result = await this.taskModel.findByIdAndDelete(id);
        if (!result) {
            throw new HttpException('Not found', 404);
        }

        return { status: 'deleted', code: 200, message: 'Task deleted' };
    }

    async deleteTasksByOwner(id: string) {
        const tasks = await this.taskModel.find({ owner: id });
        const taskId = tasks.map(task => task._id);
        if (taskId.length > 0) {
            return await this.taskModel.deleteMany({ _id: taskId });
        }
    }
}
