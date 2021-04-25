import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { TransactionDto } from './dto/transaction.dto';
import { TransactionService } from './transaction.service';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  @ApiBody({ type: TransactionDto })
  create(@Body() transactionDto: TransactionDto) {
    return this.transactionService.create(transactionDto);
  }

  @Get()
  findAll() {
    return this.transactionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() transactionDto: TransactionDto) {
    return this.transactionService.update(+id, transactionDto);
  }
}
