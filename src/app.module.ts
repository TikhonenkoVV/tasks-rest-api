import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { BoardsModule } from './boards/boards.module';
import { ColumnsModule } from './columns/columns.module';
import { TasksModule } from './tasks/tasks.module';
import { ConfigModule } from '@nestjs/config';
import { HelpService } from './help/services/help/help.service';
import { HelpModule } from './help/help.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRoot(process.env.DB_HOST),
        UsersModule,
        AuthModule,
        BoardsModule,
        ColumnsModule,
        TasksModule,
        HelpModule,
    ],
    controllers: [AppController],
    providers: [AppService, HelpService],
})
export class AppModule {}
