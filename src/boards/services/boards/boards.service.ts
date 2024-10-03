import { HttpException, Injectable, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBoardDto } from 'src/boards/dtos/CreateBoard.dto';
import { UpdateBoardDto } from 'src/boards/dtos/UpdateBoard.dto';
import { Board } from 'src/boards/schemas/boards/Board.schema';

@Injectable()
export class BoardsService {
    constructor(@InjectModel(Board.name) private boardModel: Model<Board>) {}

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
        const newBoard = new this.boardModel({ owner, ...boardData });
        return newBoard.save();
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
}
