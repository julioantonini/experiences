import { EntityRepository } from 'nestjs-typeorm-custom-repository';
import { Repository } from 'typeorm';

import { CustomerEntity } from '../entity/customer.entity';

@EntityRepository(CustomerEntity)
export class CustomerRepository extends Repository<CustomerEntity> {
  findById(id: number): Promise<CustomerEntity> {
    return this.findOne({ where: { id } });
  }

  findByEmail(email: string): Promise<CustomerEntity> {
    return this.findOne({ where: { email } });
  }

  findByCpf(cpf: string): Promise<CustomerEntity> {
    return this.findOne({ where: { cpf } });
  }
}
