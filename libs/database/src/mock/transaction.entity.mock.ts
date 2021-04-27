import { TransactionEntity } from '../entity';
import { mockColaboratorEntity } from './colaborator.entity.mock';
import { mockCustomerEntity } from './customer.entity.mock';
import { mockStoreEntity } from './store.entity.mock';

export const mockTransactionEntity: TransactionEntity = {
  id: 1,
  date: new Date('2020-04-27T17:34:00'),
  value: 19.99,
  createdAt: new Date('2020-04-27T17:34:00'),
  updatedAt: new Date('2020-04-27T17:34:00'),
  custommer: mockCustomerEntity,
  store: mockStoreEntity,
  collaborator: mockColaboratorEntity,
  ratting: [],
  _convertNumericsLoad: () => ({}),
};
