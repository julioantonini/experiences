import { EntityRepository } from 'nestjs-typeorm-custom-repository';
import { Repository } from 'typeorm';

import { CollaboratorEntity } from '../entity';
import { CollaboratorEntityRelations } from '../entity/collaborator.entity';

@EntityRepository(CollaboratorEntity)
export class CollaboratorRepository extends Repository<CollaboratorEntity> {
  findById(id: number, relations: CollaboratorEntityRelations[] = []): Promise<CollaboratorEntity> {
    return this.findOne({ where: { id }, relations });
  }

  findByName(name: string): Promise<CollaboratorEntity> {
    return this.findOne({ where: { name } });
  }

  findByNameAndStoreId(name: string, storeId: number): Promise<CollaboratorEntity> {
    return this.findOne({ where: { store: { id: storeId }, name } });
  }

  findAll(relations: CollaboratorEntityRelations[]): Promise<CollaboratorEntity[]> {
    return this.find({ relations: relations });
  }
}
