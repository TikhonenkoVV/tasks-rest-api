import { Module } from '@nestjs/common';
import { ColumnsService } from './services/columns/columns.service';
import { ColumnsController } from './controllers/columns/columns.controller';

@Module({
  providers: [ColumnsService],
  controllers: [ColumnsController]
})
export class ColumnsModule {}
