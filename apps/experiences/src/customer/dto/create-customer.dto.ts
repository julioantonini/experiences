import { IsEmail, IsNotEmpty, Length, MaxLength, MinLength } from 'class-validator';
import { IsValidCpf } from 'libs/validators/src';

export class CreateCustomerDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  phone: string;

  @Length(11, 11)
  @IsValidCpf()
  cpf: string;
}
