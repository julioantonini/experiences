import { EntityRepository, Repository } from 'typeorm';
import { CollaboratorEntity } from '../entity';

@EntityRepository(CollaboratorEntity)
export class CollaboratorRepository extends Repository<CollaboratorEntity> {
  findById(id: number): Promise<CollaboratorEntity> {
    return this.findOne({ id }, { relations: ['store'] });
  }

  findByName(name: string): Promise<CollaboratorEntity> {
    return this.findOne({ name });
  }

  findByNameAndStoreId(name: string, storeId: number): Promise<CollaboratorEntity> {
    return this.findOne({ where: { store: { id: storeId }, name } });
  }
}
