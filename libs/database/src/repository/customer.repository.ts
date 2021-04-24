import { EntityRepository, Repository } from 'typeorm';
import { CustomerEntity } from '../entity/customer.entity';

@EntityRepository(CustomerEntity)
export class CustomerRepository extends Repository<CustomerEntity> {
  findById(id: number): Promise<CustomerEntity> {
    return this.findOne({ id });
  }

  findByEmail(email: string): Promise<CustomerEntity> {
    return this.findOne({ email });
  }

  findByCpf(cpf: string): Promise<CustomerEntity> {
    return this.findOne({ cpf });
  }
}
