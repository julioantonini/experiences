import { IsValidCpf } from './isValidCpf.validator';
import { validate } from 'class-validator';

describe('isValidCpf.validator', () => {
  it('Given a valid cpf, shold be not return validation errors', async () => {
    class ClassWithDate {
      @IsValidCpf()
      cpfString: string;
    }

    const entity = new ClassWithDate();
    entity.cpfString = '27442961045';

    const validationErrors = await validate(entity);
    expect(validationErrors).toHaveLength(0);
  });

  it('Given a invalid cpf, shold be return validation errors', async () => {
    class ClassWithDate {
      @IsValidCpf()
      cpfString: string;
    }

    const entity = new ClassWithDate();
    entity.cpfString = '00000000000';

    const validationErrors = await validate(entity);
    expect(validationErrors).toHaveLength(1);
    expect(validationErrors[0].constraints.IsValidCpf).toBe('The cpf is not valid');
  });
});
