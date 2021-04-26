import { CustomerEntity } from '@database/database/entity';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CustomerService } from './customer.service';
import { CustomerDto } from './dto/customer.dto';

@Controller('customer')
@ApiTags('Customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  @ApiBody({ type: CustomerDto })
  create(@Body() customerDto: CustomerDto): Promise<CustomerEntity> {
    return this.customerService.create(customerDto);
  }

  @Get()
  findAll(): Promise<CustomerEntity[]> {
    return this.customerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<CustomerEntity> {
    return this.customerService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() customerDto: CustomerDto): Promise<CustomerEntity> {
    return this.customerService.update(+id, customerDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.customerService.delete(+id);
  }
}
