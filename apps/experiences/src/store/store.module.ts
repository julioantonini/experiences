import { Module } from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import { DatabaseModule } from '@database/database';

@Module({
  imports: [DatabaseModule],
  controllers: [StoreController],
  providers: [StoreService],
})
export class StoreModule {}
