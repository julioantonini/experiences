import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RatingService } from './rating.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { RatingDto } from './dto/rating.dto';

@Controller('rating')
@ApiTags('Rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Post()
  @ApiBody({ type: RatingService })
  create(@Body() ratingDto: RatingDto) {
    return this.ratingService.create(ratingDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ratingService.findOne(+id);
  }
}
