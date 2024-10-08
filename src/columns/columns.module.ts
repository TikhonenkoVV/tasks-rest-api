import { Module } from '@nestjs/common';
import { ColumnsService } from './services/columns/columns.service';
import { ColumnsController } from './controllers/columns/columns.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Column, ColumnSchema } from './schemas/columns/Column.schema';
import { TasksModule } from 'src/tasks/tasks.module';

@Module({
    imports: [
        TasksModule,
        MongooseModule.forFeature([
            {
                name: Column.name,
                schema: ColumnSchema,
            },
        ]),
    ],
    controllers: [ColumnsController],
    providers: [ColumnsService],
    exports: [ColumnsService],
})
export class ColumnsModule {}
