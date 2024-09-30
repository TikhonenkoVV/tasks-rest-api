import { HttpException, Injectable, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBoardDto } from 'src/boards/dtos/CreateBoard.dto';
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
            throw new HttpException('Board alredy exist.', 409);
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
}
