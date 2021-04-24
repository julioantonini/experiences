import { registerDecorator, ValidationOptions } from 'class-validator';
import { validate as validateCpf } from 'cpf-check';

export function IsValidCpf(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsValidCpf',
      target: object.constructor,
      propertyName: propertyName,
      options: Object.assign(
        {
          message: 'The cpf is not valid',
        },
        validationOptions,
      ),
      validator: {
        validate(value: any) {
          return validateCpf(value);
        },
      },
    });
  };
}
