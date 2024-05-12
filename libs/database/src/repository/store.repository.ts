import { EntityRepository } from 'nestjs-typeorm-custom-repository';
import { Repository } from 'typeorm';

import { StoreEntity } from '../entity';
import { StoreEntityRelations } from '../entity/store.entity';

@EntityRepository(StoreEntity)
export class StoreRepository extends Repository<StoreEntity> {
  findById(id: number, relations: StoreEntityRelations[] = []): Promise<StoreEntity> {
    return this.findOne({ where: { id }, relations: relations });
  }

  findByName(name: string): Promise<StoreEntity> {
    return this.findOne({ where: { name } });
  }
}
