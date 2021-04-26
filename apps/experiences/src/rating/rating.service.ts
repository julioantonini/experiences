import { RatingEntity } from '@database/database/entity';
import { RatingRepository } from '@database/database/repository/rating.repository';
import { TransactionRepository } from '@database/database/repository/transaction.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { RatingDto } from './dto/rating.dto';
@Injectable()
export class RatingService {
  constructor(private ratingRepository: RatingRepository, private transactionRepository: TransactionRepository) {}

  async create(ratingDto: RatingDto): Promise<RatingEntity> {
    const { transactionId } = ratingDto;

    const transaction = await this.transactionRepository.findById(transactionId);

    if (!transaction) this.throwNotFoundById('Transaction', transactionId);
    const ratting = this.ratingRepository.create(ratingDto);
    ratting.transaction = transaction;
    return this.ratingRepository.save(ratting);
  }

  async findAll(): Promise<RatingEntity[]> {
    return this.ratingRepository.findAll(['transaction']);
  }

  async findOne(id: number): Promise<RatingEntity> {
    const ratting = await this.ratingRepository.findById(id, ['transaction']);
    if (!ratting) this.throwNotFoundById('Rating', id);

    return ratting;
  }

  private throwNotFoundById(entityName: 'Transaction' | 'Rating', id: number) {
    throw new NotFoundException(`${entityName} with id: ${id} not found`);
  }
}
