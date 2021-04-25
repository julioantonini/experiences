import { CollaboratorEntity } from './collaborator.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export type StoreEntityRelations = 'collaborators';
@Entity('store')
export class StoreEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => CollaboratorEntity, (collaborator) => collaborator.store)
  collaborators: CollaboratorEntity[];
}
