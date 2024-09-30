import {
    Body,
    Controller,
    Get,
    Post,
    Req,
    UseGuards,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { Request } from 'express';
import { CreateBoardDto } from 'src/boards/dtos/CreateBoard.dto';
import { BoardsService } from 'src/boards/services/boards/boards.service';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';

@Controller('api/boards')
export class BoardsController {
    constructor(private boardServices: BoardsService) {}

    @UseGuards(AccessTokenGuard)
    @Post()
    @UsePipes(new ValidationPipe())
    createBoard(@Body() createBoardDto: CreateBoardDto, @Req() req: Request) {
        const owner = req.user['sub'];
        return this.boardServices.createBoard(owner, createBoardDto);
    }

    @UseGuards(AccessTokenGuard)
    @Get()
    async getBoards(@Req() req: Request) {
        const owner = req.user['sub'];
        return this.boardServices.getBoerds(owner);
    }
}
