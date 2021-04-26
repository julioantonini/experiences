import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { RatingDto } from './dto/rating.dto';
import { RatingService } from './rating.service';

@Controller('rating')
@ApiTags('Rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Post()
  @ApiBody({ type: RatingService })
  create(@Body() ratingDto: RatingDto) {
    return this.ratingService.create(ratingDto);
  }

  @Get()
  findAll() {
    return this.ratingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ratingService.findOne(+id);
  }
}
