import { HttpException, Injectable, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBoardDto } from 'src/boards/dtos/CreateBoard.dto';
import { UpdateBoardDto } from 'src/boards/dtos/UpdateBoard.dto';
import { Board } from 'src/boards/schemas/boards/Board.schema';
import { ColumnsService } from 'src/columns/services/columns/columns.service';
import { TasksService } from 'src/tasks/services/tasks/tasks.service';

@Injectable()
export class BoardsService {
    constructor(
        @InjectModel(Board.name) private boardModel: Model<Board>,
        private columnServices: ColumnsService,
        private tasksServices: TasksService
    ) {}

    async createBoard(owner: string, boardData: CreateBoardDto) {
        const isMatch = await this.boardModel.findOne({
            owner,
            title: boardData.title,
        });
        if (isMatch) {
            throw new HttpException(
                'This board name already exists in this user.',
                409
            );
        }
        const newBoard = await new this.boardModel({
            owner,
            ...boardData,
        }).save();

        return {
            status: 'created',
            code: 201,
            message: 'Board created successfully',
            board: {
                _id: newBoard._id,
                title: newBoard.title,
                background: newBoard.background,
                dashboardIcon: newBoard.dashboardIcon,
            },
        };
    }

    async getBoerds(owner: string) {
        const boardsArr = await this.boardModel.find({ owner });
        return {
            status: 'success',
            code: 200,
            message: 'Boards successfully received',
            boards: boardsArr,
        };
    }

    async updateBoard(
        id: string,
        owner: string,
        updateBoardDto: UpdateBoardDto
    ) {
        const result = await this.boardModel.find({
            owner,
            title: updateBoardDto.title,
        });
        const isDuplicateTitle = result.filter(
            el => el._id.toString() !== id
        ).length;
        if (isDuplicateTitle) {
            throw new HttpException(
                'This board name already exists in this user',
                409
            );
        }

        const board = await this.boardModel
            .findByIdAndUpdate(id, updateBoardDto, {
                new: true,
                select: '-owner -createdAt -updatedAt',
            })
            .exec();

        return {
            status: 'create',
            code: 201,
            message: 'Board updated successfully',
            board: board,
        };
    }

    async deleteBoard(id: string) {
        const columns = await this.columnServices.getColumnsByOwner(id);
        const columnsId = columns.map(col => col._id);

        if (columnsId.length > 0) {
            columnsId.map(async id =>
                this.tasksServices.deleteTasksByOwner(id.toString())
            );
            columnsId.map(async col =>
                this.columnServices.deleteColumnsByOwner(col.toString())
            );
        }
        const deletedBoard = await this.boardModel.findByIdAndDelete({
            _id: id,
        });
        return {
            status: 'success',
            code: 200,
            message: 'Board deleted',
            board: deletedBoard,
        };
    }
}
