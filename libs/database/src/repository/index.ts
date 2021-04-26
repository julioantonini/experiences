import { CollaboratorRepository } from './collaborator.repository';
import { CustomerRepository } from './customer.repository';
import { RatingRepository } from './rating.repository';
import { StoreRepository } from './store.repository';
import { TransactionRepository } from './transaction.repository';

export const repositories = [
  CustomerRepository,
  StoreRepository,
  CollaboratorRepository,
  TransactionRepository,
  RatingRepository,
];
