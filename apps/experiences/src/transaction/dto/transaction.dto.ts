import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsNumberString } from 'class-validator';
import { Type } from 'class-transformer';
export class TransactionDto {
  @ApiProperty()
  @IsNumberString()
  custommerId: number;

  @ApiProperty()
  @IsNumberString()
  storeId: number;

  @ApiProperty()
  @IsNumberString()
  collaboratorId: number;

  @ApiProperty()
  @IsDateString()
  date: Date;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  value: number;
}
