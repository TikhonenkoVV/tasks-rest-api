import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    Param,
    Patch,
    Post,
    UseGuards,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { ColumnsService } from 'src/columns/services/columns/columns.service';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { CreateColumnDto } from '../../dtos/CreateColumn.dto';
import mongoose from 'mongoose';
import { UpdateColumnDto } from 'src/columns/dtos/UpdateColumn.dto';

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
    getColumns(@Param('owner') owner: string) {
        const isValidId = mongoose.Types.ObjectId.isValid(owner);
        if (!isValidId) throw new HttpException('Invalid id.', 400);
        return this.columnServices.getColumns(owner);
    }

    @UseGuards(AccessTokenGuard)
    @Patch(':id')
    @UsePipes(new ValidationPipe())
    updateColumn(
        @Param('id') id: string,
        @Body() updateColumnDto: UpdateColumnDto
    ) {
        const { owner } = updateColumnDto;

        const isValidOwner = mongoose.Types.ObjectId.isValid(owner);
        if (!isValidOwner) throw new HttpException('Invalid id.', 404);

        const isValidId = mongoose.Types.ObjectId.isValid(id);
        if (!isValidId) throw new HttpException('Column not found.', 404);

        return this.columnServices.updateColumn(id, owner, updateColumnDto);
    }

    @UseGuards(AccessTokenGuard)
    @Delete(':id')
    @UsePipes(new ValidationPipe())
    deleteColumn(@Param('id') id: string) {
        const isValidId = mongoose.Types.ObjectId.isValid(id);
        if (!isValidId) throw new HttpException('Column not found.', 404);

        return this.columnServices.deleteColumn(id);
    }
}
