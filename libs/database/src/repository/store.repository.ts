import { EntityRepository, Repository } from 'typeorm';
import { StoreEntity } from '../entity';

@EntityRepository(StoreEntity)
export class StoreRepository extends Repository<StoreEntity> {
  findById(id: number): Promise<StoreEntity> {
    return this.findOne({ id });
  }

  findByName(name: string): Promise<StoreEntity> {
    return this.findOne({ name });
  }
}
