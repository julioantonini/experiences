import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsNumberString, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class RatingDto {
  @ApiProperty()
  @IsNumberString()
  transactionId: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  @Max(10)
  @Type(() => Number)
  rating: number;

  @ApiProperty()
  @IsNotEmpty()
  comment: string;
}
