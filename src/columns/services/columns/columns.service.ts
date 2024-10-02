import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateColumnDto } from 'src/columns/dtos/CreateColumn.dto';
import { Column } from 'src/columns/schemas/columns/Column.schema';

@Injectable()
export class ColumnsService {
    constructor(@InjectModel(Column.name) private columnModel: Model<Column>) {}

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
        const newColumn = new this.columnModel(columnData);
        return newColumn.save();
    }
}
