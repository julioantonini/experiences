import {
  AfterLoad,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CollaboratorEntity, CustomerEntity, StoreEntity } from '.';
import { RatingEntity } from './rating.entity';

export type TransactionEntityRelations = 'custommer' | 'store' | 'collaborator' | 'ratting';

@Entity('transaction')
export class TransactionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  date: Date;

  @Column('decimal', { precision: 12, scale: 2 })
  value: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => CustomerEntity, { eager: false, onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  custommer: CustomerEntity;

  @ManyToOne(() => StoreEntity, { eager: false, onUpdate: 'CASCADE', onDelete: 'SET NULL' })
  store: StoreEntity;

  @ManyToOne(() => CollaboratorEntity, { eager: false, onUpdate: 'CASCADE', onDelete: 'SET NULL' })
  collaborator: CollaboratorEntity;

  @OneToMany(() => RatingEntity, (ratting) => ratting.transaction)
  ratting: RatingEntity[];

  @AfterLoad() @BeforeInsert() @BeforeUpdate() _convertNumericsLoad() {
    this.value = parseFloat(this.value as any);
  }
}
