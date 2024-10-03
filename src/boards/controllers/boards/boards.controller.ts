import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Post,
    Req,
    UseGuards,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { Request } from 'express';
import { CreateBoardDto } from 'src/boards/dtos/CreateBoard.dto';
import { UpdateBoardDto } from 'src/boards/dtos/UpdateBoard.dto';
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
    getBoards(@Req() req: Request) {
        const owner = req.user['sub'];
        return this.boardServices.getBoerds(owner);
    }

    @UseGuards(AccessTokenGuard)
    @Patch(':id')
    @UsePipes(new ValidationPipe())
    updateBoard(
        @Param('id') id: string,
        @Body() updateBoardDto: UpdateBoardDto,
        @Req() req: Request
    ) {
        const owner = req.user['sub'];
        console.log('id: ', id);

        return this.boardServices.updateBoard(id, owner, updateBoardDto);
    }
}
