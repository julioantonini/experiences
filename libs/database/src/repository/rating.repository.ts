import { EntityRepository, Repository } from 'typeorm';
import { RatingEntity, RatingEntityRelations } from '../entity/rating.entity';

@EntityRepository(RatingEntity)
export class RatingRepository extends Repository<RatingEntity> {
  findById(id: number, relations: RatingEntityRelations[] = []): Promise<RatingEntity> {
    return this.findOne({ id }, { relations: relations });
  }

  findAll(relations: RatingEntityRelations[] = []): Promise<RatingEntity[]> {
    return this.find({ relations: relations });
  }
}
