import { HttpException, Injectable, Type } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateColumnDto } from 'src/columns/dtos/CreateColumn.dto';
import { UpdateColumnDto } from 'src/columns/dtos/UpdateColumn.dto';
import { Column } from 'src/columns/schemas/columns/Column.schema';
import { TasksService } from 'src/tasks/services/tasks/tasks.service';

@Injectable()
export class ColumnsService {
    constructor(
        @InjectModel(Column.name) private columnModel: Model<Column>,
        private taskServices: TasksService
    ) {}

    async getColumns(owner: string) {
        const columnsArr = await this.columnModel
            .find({ owner })
            .populate({ path: 'cards', options: { sort: 'index' } })
            .sort('index');
        return {
            status: 'success',
            code: 200,
            message: 'Columns successfully received',
            columns: columnsArr,
        };
    }

    async createColumn(columnData: CreateColumnDto) {
        const isMatch = await this.columnModel.findOne({
            owner: columnData.owner,
            title: columnData.title,
        });
        if (isMatch) {
            throw new HttpException('Column already exist.', 409);
        }
        const newColumn = await new this.columnModel(columnData).save();
        return {
            status: 'create',
            code: 201,
            message: 'Column created successfully',
            column: {
                _id: newColumn._id,
                title: newColumn.title,
                index: newColumn.index,
                owner: newColumn.owner,
                cards: [],
            },
        };
    }

    async updateColumn(
        id: string,
        owner: string,
        updateColumnDto: UpdateColumnDto
    ) {
        const result = await this.columnModel.find({
            owner,
            title: updateColumnDto.title,
        });
        const isDuplicateTitle = result.filter(
            el => el._id.toString() !== id
        ).length;

        if (isDuplicateTitle) {
            throw new HttpException(
                'This column name already exists in this board',
                409
            );
        }
        const column = await this.columnModel
            .findByIdAndUpdate(id, updateColumnDto, {
                new: true,
                select: '-createdAt -updatedAt',
            })
            .exec();

        return {
            status: 'updated',
            code: 200,
            message: 'Column updated successfully',
            column: column,
        };
    }

    async deleteColumn(id: string) {
        const result = await this.columnModel.findByIdAndDelete(id);

        if (!result) {
            throw new HttpException('Not found', 404);
        }

        await this.taskServices.deleteTasksByOwner(id);

        return {
            status: 'deleted',
            code: 200,
            message: 'Column deleted',
            column: result,
        };
    }

    async getColumnsByOwner(id: string) {
        const columns = await this.columnModel.find({ owner: id });
        const columnsId = columns.map(col => col._id);
        return columnsId;
    }

    async deleteColumnsByOwner(col: string) {
        return this.columnModel.findByIdAndDelete({ _id: col });
    }
}
