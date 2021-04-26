import { StoreEntity } from '@database/database/entity';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { StoreDto } from './dto/store.dto';
import { StoreService } from './store.service';
@Controller('store')
@ApiTags('Store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Post()
  @ApiBody({ type: StoreDto })
  create(@Body() storeDto: StoreDto): Promise<StoreEntity> {
    return this.storeService.create(storeDto);
  }

  @Get()
  findAll(): Promise<StoreEntity[]> {
    return this.storeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<StoreEntity> {
    return this.storeService.findOne(+id);
  }

  @Put(':id')
  @ApiBody({ type: StoreDto })
  update(@Param('id') id: string, @Body() storeDto: StoreDto): Promise<StoreEntity> {
    return this.storeService.update(+id, storeDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.storeService.delete(+id);
  }
}
