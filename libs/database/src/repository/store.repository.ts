import { EntityRepository, Repository } from 'typeorm';
import { StoreEntity } from '../entity';
import { StoreEntityRelations } from '../entity/store.entity';

@EntityRepository(StoreEntity)
export class StoreRepository extends Repository<StoreEntity> {
  findById(id: number, relations: StoreEntityRelations[] = []): Promise<StoreEntity> {
    return this.findOne({ id }, { relations: relations });
  }

  findByName(name: string): Promise<StoreEntity> {
    return this.findOne({ name });
  }
}
