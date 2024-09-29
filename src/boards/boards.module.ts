import { Module } from '@nestjs/common';
import { BoardsController } from './controllers/boards/boards.controller';
import { BoardsService } from './services/boards/boards.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Board, BoardSchema } from './schemas/boards/Board.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Board.name,
                schema: BoardSchema,
            },
        ]),
    ],
    controllers: [BoardsController],
    providers: [BoardsService],
})
export class BoardsModule {}
