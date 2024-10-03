import {
    Body,
    Controller,
    HttpException,
    Param,
    Patch,
    Post,
    UseGuards,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import mongoose from 'mongoose';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { CreateTaskDto } from 'src/tasks/dtos/CreateTask.dto';
import { UpdateTaskDto } from 'src/tasks/dtos/UpdateTask.dto';
import { TasksService } from 'src/tasks/services/tasks/tasks.service';

@Controller('api/tasks')
export class TasksController {
    constructor(private taskServices: TasksService) {}

    @UseGuards(AccessTokenGuard)
    @Post()
    @UsePipes(new ValidationPipe())
    createTask(@Body() createTaskDto: CreateTaskDto) {
        return this.taskServices.createTask(createTaskDto);
    }

    @UseGuards(AccessTokenGuard)
    @Patch(':id')
    @UsePipes(new ValidationPipe())
    updateTask(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
        const { owner } = updateTaskDto;
        const isValidId = mongoose.Types.ObjectId.isValid(owner);
        if (!isValidId) throw new HttpException('Task not found.', 404);
        return this.taskServices.updateTask(id, owner, updateTaskDto);
    }
}
