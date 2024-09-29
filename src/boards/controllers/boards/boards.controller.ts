import {
    Body,
    Controller,
    Get,
    Post,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { CreateBoardDto } from 'src/boards/dtos/CreateBoard.dto';
import { BoardsService } from 'src/boards/services/boards/boards.service';

@Controller('api/boards')
export class BoardsController {
    constructor(private boardServices: BoardsService) {}

    @Post()
    @UsePipes(new ValidationPipe())
    createBoard(@Body() createBoardDto: CreateBoardDto) {
        const owner = '66f6c0511fde2cd679037ee7';
        return this.boardServices.createBoard(owner, createBoardDto);
    }

    @Get()
    async getBoards() {
        const owner = '66f6c0511fde2cd679037ee7';
        return this.boardServices.getBoerds(owner);
    }
}
