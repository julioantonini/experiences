import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class StoreDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;
}
