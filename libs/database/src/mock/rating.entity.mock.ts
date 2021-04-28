import { RatingEntity } from '../entity';
import { mockTransactionEntity } from './transaction.entity.mock';

export const mockSRatingEntity: RatingEntity = {
  id: 1,
  rating: 10,
  comment: 'first rating',
  transaction: mockTransactionEntity,
  createdAt: new Date('2020-04-27T17:34:00'),
  updatedAt: new Date('2020-04-27T17:34:00'),
  _convertNumericsLoad: () => ({}),
};
