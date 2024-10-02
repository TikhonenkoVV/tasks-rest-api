import {
    Body,
    Controller,
    Get,
    HttpException,
    Param,
    Post,
    UseGuards,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { ColumnsService } from 'src/columns/services/columns/columns.service';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { CreateColumnDto } from '../../dtos/CreateColumn.dto';
import mongoose from 'mongoose';

@Controller('api/columns')
export class ColumnsController {
    constructor(private columnServices: ColumnsService) {}

    @UseGuards(AccessTokenGuard)
    @Post()
    @UsePipes(new ValidationPipe())
    CreateColumn(@Body() createColumnDto: CreateColumnDto) {
        return this.columnServices.createColumn(createColumnDto);
    }

    @UseGuards(AccessTokenGuard)
    @Get(':owner')
    async getColumns(@Param('owner') owner: string) {
        const isValidId = mongoose.Types.ObjectId.isValid(owner);
        if (!isValidId) throw new HttpException('Invalid id.', 400);
        return this.columnServices.getColumns(owner);
    }
}
