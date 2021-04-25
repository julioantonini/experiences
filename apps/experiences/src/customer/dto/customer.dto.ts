import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsPhoneNumber, Length } from 'class-validator';
import { IsValidCpf } from 'libs/validators/src';

export class CustomerDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsPhoneNumber('BR')
  phone: string;

  @ApiProperty()
  @Length(11, 11)
  @IsValidCpf()
  cpf: string;
}
