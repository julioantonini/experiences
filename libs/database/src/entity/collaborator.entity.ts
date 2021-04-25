import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { StoreEntity } from '.';

export type CollaboratorEntityRelations = 'store';
@Entity('collaborator')
export class CollaboratorEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => StoreEntity, { eager: false, onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  store: StoreEntity;
}
