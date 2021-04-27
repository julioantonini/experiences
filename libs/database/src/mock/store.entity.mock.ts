import { StoreEntity } from '../entity';
import { mockColaboratorEntity } from './colaborator.entity.mock';

export const mockStoreEntity: StoreEntity = {
  id: 1,
  name: 'store 1',
  createdAt: new Date('2020-04-27T17:34:00'),
  updatedAt: new Date('2020-04-27T17:34:00'),
  collaborators: [mockColaboratorEntity],
};
