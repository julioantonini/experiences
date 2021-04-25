import { CollaboratorRepository } from './collaborator.repository';
import { CustomerRepository } from './customer.repository';
import { StoreRepository } from './store.repository';
import { TransactionRepository } from './transaction.repository';

export const repositories = [CustomerRepository, StoreRepository, CollaboratorRepository, TransactionRepository];
