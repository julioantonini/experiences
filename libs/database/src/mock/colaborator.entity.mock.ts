import { CollaboratorEntity } from '../entity';

export const mockColaboratorEntity: CollaboratorEntity = {
  id: 1,
  name: 'colaborator 1',
  createdAt: new Date('2020-04-27T17:34:00'),
  updatedAt: new Date('2020-04-27T17:34:00'),
  store: {
    id: 1,
    name: 'store 1',
    createdAt: new Date('2020-04-27T17:34:00'),
    updatedAt: new Date('2020-04-27T17:34:00'),
    collaborators: [],
  },
};
