import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { IsValidCpf } from 'libs/validators/src';

export class CustomerDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  @Length(11, 11)
  @IsValidCpf()
  cpf: string;
}
