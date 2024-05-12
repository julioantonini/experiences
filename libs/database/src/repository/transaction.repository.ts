import { EntityRepository } from 'nestjs-typeorm-custom-repository';
import { Repository } from 'typeorm';

import { TransactionEntity, TransactionEntityRelations } from './../entity/transaction.entity';

@EntityRepository(TransactionEntity)
export class TransactionRepository extends Repository<TransactionEntity> {
  findById(id: number, relations: TransactionEntityRelations[] = []): Promise<TransactionEntity> {
    return this.findOne({ where: { id }, relations: relations });
  }

  findAllByDate(relations: TransactionEntityRelations[] = []): Promise<TransactionEntity[]> {
    return this.find({ relations: relations, order: { date: 'DESC' } });
  }
}
