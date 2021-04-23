import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateCustomerDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  phone: string;

  @IsNotEmpty()
  cpf: string;
}
