import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CustomerEntity } from './entities/customer.entity';
import { CustomerRepository } from './repository/customer.repository';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(CustomerRepository)
    private costumerRepository: CustomerRepository,
  ) {}

  async create(createCustomerDto: CreateCustomerDto): Promise<CustomerEntity> {
    const customer = this.costumerRepository.create(createCustomerDto);
    return this.costumerRepository.save(customer);
  }

  findAll() {}

  findOne(id: number) {}

  async update(
    id: number,
    updateCustomerDto: UpdateCustomerDto,
  ): Promise<CustomerEntity> {
    const customer = await this.costumerRepository.findById(id);

    return this.costumerRepository.save({
      ...customer,
      ...updateCustomerDto,
    });
  }

  delete(id: number) {}
}
