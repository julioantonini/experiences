import { CustomerEntity } from '@database/database/entity';
import { CustomerRepository } from '@database/database/repository/customer.repository';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CustomerDto } from './dto/customer.dto';
@Injectable()
export class CustomerService {
  constructor(private costumerRepository: CustomerRepository) {}

  async create(customerDto: CustomerDto): Promise<CustomerEntity> {
    await this.checkIfExists(customerDto);

    const customer = this.costumerRepository.create(customerDto);
    return this.costumerRepository.save(customer);
  }

  async findAll(): Promise<CustomerEntity[]> {
    return this.costumerRepository.find();
  }

  async findOne(id: number): Promise<CustomerEntity> {
    const customer = await this.costumerRepository.findById(id);
    if (!customer) this.throwNotFoundById(id);

    return customer;
  }

  async update(id: number, customerDto: CustomerDto): Promise<CustomerEntity> {
    await this.checkIfExists(customerDto, id);

    const customer = await this.costumerRepository.findById(id);

    if (!customer) this.throwNotFoundById(id);

    return this.costumerRepository.save({
      ...customer,
      ...customerDto,
    });
  }

  async delete(id: number) {
    const result = await this.costumerRepository.delete(id);
    if (result.affected === 0) this.throwNotFoundById(id);
  }

  private async checkIfExists(customerDto: CustomerDto, customerId: number = null) {
    const { email, cpf } = customerDto;

    const costumerWithEmail = await this.costumerRepository.findByEmail(email);
    if (customerId ? costumerWithEmail && costumerWithEmail.id !== customerId : costumerWithEmail) {
      throw new ConflictException('E-mail already in use');
    }

    const costumerWithCpf = await this.costumerRepository.findByCpf(cpf);
    if (customerId ? costumerWithCpf && costumerWithCpf.id !== customerId : costumerWithCpf) {
      throw new ConflictException('Cpf already in use');
    }
  }

  private throwNotFoundById(id: number) {
    throw new NotFoundException(`Customer with id: ${id} not found`);
  }
}
