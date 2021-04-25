import { TransactionEntity } from '@database/database/entity';
import { CollaboratorRepository } from '@database/database/repository/collaborator.repository';
import { CustomerRepository } from '@database/database/repository/customer.repository';
import { StoreRepository } from '@database/database/repository/store.repository';
import { TransactionRepository } from '@database/database/repository/transaction.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { TransactionDto } from './dto/transaction.dto';

@Injectable()
export class TransactionService {
  constructor(
    private transactionRepository: TransactionRepository,
    private customerRepository: CustomerRepository,
    private storeRepository: StoreRepository,
    private collaboratorRepository: CollaboratorRepository,
  ) {}
  async create(transactionDto: TransactionDto): Promise<TransactionEntity> {
    const { custommerId, storeId, collaboratorId } = transactionDto;

    const customer = await this.customerRepository.findById(custommerId);
    if (!customer) this.throwNotFoundById('Customer', custommerId);

    const store = await this.storeRepository.findById(storeId);
    if (!store) this.throwNotFoundById('Store', storeId);

    const collaborator = await this.collaboratorRepository.findById(collaboratorId, ['store']);
    if (!collaborator || collaborator.store.id !== store.id) {
      throw new NotFoundException(`Collaborator with id: ${collaboratorId} not found in store with id: ${storeId}`);
    }

    const transaction = this.transactionRepository.create(transactionDto);
    transaction.custommer = customer;
    transaction.store = store;
    delete collaborator.store;
    transaction.collaborator = collaborator;

    return this.transactionRepository.save(transaction);
  }

  async findAll(): Promise<TransactionEntity[]> {
    return this.transactionRepository.findAllByDate();
  }

  async findOne(id: number): Promise<TransactionEntity> {
    const transaction = await this.transactionRepository.findById(id, ['custommer', 'store', 'collaborator']);
    if (!transaction) this.throwNotFoundById('Transaction', id);

    return transaction;
  }

  async update(id: number, transactionDto: TransactionDto): Promise<TransactionEntity> {
    const transaction = await this.transactionRepository.findById(id);
    if (!transaction) this.throwNotFoundById('Transaction', id);

    const { custommerId, storeId, collaboratorId, value, date } = transactionDto;

    const customer = await this.customerRepository.findById(custommerId);
    if (!customer) this.throwNotFoundById('Customer', custommerId);

    const store = await this.storeRepository.findById(storeId);
    if (!store) this.throwNotFoundById('Store', storeId);

    const collaborator = await this.collaboratorRepository.findById(collaboratorId, ['store']);
    if (!collaborator || collaborator.store.id !== store.id) {
      throw new NotFoundException(`Collaborator with id: ${collaboratorId} not found in store with id: ${storeId}`);
    }

    transaction.custommer = customer;
    transaction.store = store;
    delete collaborator.store;
    transaction.collaborator = collaborator;
    transaction.value = value;
    transaction.date = date;
    const saved = await this.transactionRepository.save(transaction);
    console.log({ saved });
    return saved;
  }

  private throwNotFoundById(entityName: 'Collaborator' | 'Store' | 'Customer' | 'Transaction', id: number) {
    throw new NotFoundException(`${entityName} with id: ${id} not found`);
  }
}
