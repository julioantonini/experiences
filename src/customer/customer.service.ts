import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    const { email, cpf } = createCustomerDto;

    const costumerWithEmail = await this.costumerRepository.findByEmail(email);
    if (costumerWithEmail) {
      throw new ConflictException('E-mail already in use');
    }

    const costumerWithCpf = await this.costumerRepository.findByCpf(cpf);
    if (costumerWithCpf) {
      throw new ConflictException('Cpf already in use');
    }

    const customer = this.costumerRepository.create(createCustomerDto);
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

  async update(
    id: number,
    updateCustomerDto: UpdateCustomerDto,
  ): Promise<CustomerEntity> {
    const customer = await this.costumerRepository.findById(id);
    const { email, cpf } = updateCustomerDto;

    const costumerWithEmail = await this.costumerRepository.findByEmail(email);
    if (costumerWithEmail && costumerWithEmail.id !== id) {
      throw new ConflictException('E-mail already in use');
    }

    const costumerWithCpf = await this.costumerRepository.findByCpf(cpf);
    if (costumerWithCpf && costumerWithCpf.id !== id) {
      throw new ConflictException('Cpf already in use');
    }

    return this.costumerRepository.save({
      ...customer,
      ...updateCustomerDto,
    });
  }

  async delete(id: number) {
    const result = await this.costumerRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Customer with id: ${id} not found`);
    }
  }
}
