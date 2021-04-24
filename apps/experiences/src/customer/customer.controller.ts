import { ApiBody } from '@nestjs/swagger';
import { CustomerEntity } from '@database/database/entity';
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerDto } from './dto/customer.dto';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  @ApiBody({ type: CustomerDto })
  create(@Body() CustomerDto: CustomerDto): Promise<CustomerEntity> {
    return this.customerService.create(CustomerDto);
  }

  @Get()
  findAll() {
    return this.customerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCustomerDto: CustomerDto) {
    return this.customerService.update(+id, updateCustomerDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.customerService.delete(+id);
  }
}
