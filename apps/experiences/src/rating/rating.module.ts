import { Module } from '@nestjs/common';
import { RatingService } from './rating.service';
import { RatingController } from './rating.controller';
import { DatabaseModule } from '@database/database';

@Module({
  imports: [DatabaseModule],
  controllers: [RatingController],
  providers: [RatingService],
})
export class RatingModule {}
