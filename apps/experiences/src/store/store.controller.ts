import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { StoreDto } from './dto/store.dto';
import { StoreService } from './store.service';
@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Post()
  create(@Body() storeDto: StoreDto) {
    return this.storeService.create(storeDto);
  }

  @Get()
  findAll() {
    return this.storeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storeService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() storeDto: StoreDto) {
    return this.storeService.update(+id, storeDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.storeService.delete(+id);
  }
}
