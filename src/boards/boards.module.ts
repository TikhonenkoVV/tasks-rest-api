import { Module } from '@nestjs/common';
import { BoardsController } from './controllers/boards/boards.controller';
import { BoardsService } from './services/boards/boards.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Board, BoardSchema } from './schemas/boards/Board.schema';
import { ColumnsModule } from 'src/columns/columns.module';
import { TasksModule } from 'src/tasks/tasks.module';

@Module({
    imports: [
        ColumnsModule,
        TasksModule,
        MongooseModule.forFeature([
            {
                name: Board.name,
                schema: BoardSchema,
            },
        ]),
    ],
    controllers: [BoardsController],
    providers: [BoardsService],
    exports: [BoardsService],
})
export class BoardsModule {}
