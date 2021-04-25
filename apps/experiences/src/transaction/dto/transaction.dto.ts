import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumberString } from 'class-validator';

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
  @IsNumberString()
  value: number;
}
