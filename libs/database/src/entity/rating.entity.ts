import {
  AfterLoad,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TransactionEntity } from '.';

export type RatingEntityRelations = 'transaction';

@Entity('rating')
export class RatingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('integer')
  rating: number;

  @Column()
  comment: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => TransactionEntity, { eager: false, onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  transaction: TransactionEntity;

  @AfterLoad() @BeforeInsert() @BeforeUpdate() _convertNumericsLoad() {
    this.rating = parseInt(this.rating as any);
  }
}
