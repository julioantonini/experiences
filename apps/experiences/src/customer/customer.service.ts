import { CustomerEntity } from '@database/database/entity';
import { CustomerRepository } from '@database/database/repository/customer.repository';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerDto } from './dto/customer.dto';
@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(CustomerRepository)
    private costumerRepository: CustomerRepository,
  ) {}

  async create(customerDto: CustomerDto): Promise<CustomerEntity> {
    await this.checkIfExists(customerDto);

    const customer = this.costumerRepository.create(customerDto);
    return this.costumerRepository.save(customer);
  }

  findAll(): Promise<CustomerEntity[]> {
    return this.costumerRepository.find();
  }

  async findOne(id: number): Promise<CustomerEntity> {
    const customer = await this.costumerRepository.findById(id);
    if (!customer) {
      throw new NotFoundException(`Customer with id: ${id} not found`);
    }
    return customer;
  }

  async update(id: number, customerDto: CustomerDto): Promise<CustomerEntity> {
    await this.checkIfExists(customerDto, id);

    const customer = await this.costumerRepository.findById(id);

    return this.costumerRepository.save({
      ...customer,
      ...customerDto,
    });
  }

  async delete(id: number) {
    const result = await this.costumerRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Customer with id: ${id} not found`);
    }
  }

  private async checkIfExists(CustomerDto: CustomerDto, customerId: number = null) {
    const { email, cpf } = CustomerDto;

    const costumerWithEmail = await this.costumerRepository.findByEmail(email);
    const costumerWithCpf = await this.costumerRepository.findByCpf(cpf);

    if (customerId ? costumerWithEmail && costumerWithEmail.id !== customerId : costumerWithEmail) {
      throw new ConflictException('E-mail already in use');
    }

    if (customerId ? costumerWithCpf && costumerWithCpf.id !== customerId : costumerWithCpf) {
      throw new ConflictException('Cpf already in use');
    }
  }
}
