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
import { CollaboratorEntity, CustomerEntity, StoreEntity } from '.';

export type TransactionEntityRelations = 'custommer' | 'store' | 'collaborator';

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

  @AfterLoad() @BeforeInsert() @BeforeUpdate() _convertNumericsLoad() {
    this.value = parseFloat(this.value as any);
  }
}
