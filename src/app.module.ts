import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { BoardsModule } from './boards/boards.module';
import { ColumnsModule } from './columns/columns.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://admin:CkfIFku5cupQL8Up@cluster0.0huzu5p.mongodb.net/tasks_api?retryWrites=true&w=majority',
    ),
    UsersModule,
    AuthModule,
    BoardsModule,
    ColumnsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
