import { CollaboratorRepository } from '@database/database/repository/collaborator.repository';
import { StoreRepository } from '@database/database/repository/store.repository';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CollaboratorEntity } from './../../../../libs/database/src/entity/collaborator.entity';
import { CollaboratorDto } from './dto/collaborator.dto';

@Injectable()
export class CollaboratorService {
  constructor(private collaboratorRepository: CollaboratorRepository, private storeRepository: StoreRepository) {}

  async create(collaboratorDto: CollaboratorDto): Promise<CollaboratorEntity> {
    const { storeId } = collaboratorDto;
    const store = await this.storeRepository.findById(storeId);

    if (!store) this.throwNotFoundById('Store', storeId);
    await this.checkIfExists(collaboratorDto);

    const collaborator = this.collaboratorRepository.create(collaboratorDto);
    collaborator.store = store;

    return this.collaboratorRepository.save(collaborator);
  }

  async findAll(): Promise<CollaboratorEntity[]> {
    return this.collaboratorRepository.find({ relations: ['store'] });
  }

  async findOne(id: number): Promise<CollaboratorEntity> {
    const collaborator = await this.collaboratorRepository.findById(id);
    if (!collaborator) this.throwNotFoundById('Collaborator', id);

    return collaborator;
  }

  async update(id: number, collaboratorDto: CollaboratorDto): Promise<CollaboratorEntity> {
    const collaborator = await this.collaboratorRepository.findById(id);
    if (!collaborator) this.throwNotFoundById('Collaborator', id);

    const { name, storeId } = collaboratorDto;
    const store = await this.storeRepository.findById(storeId);
    if (!store) this.throwNotFoundById('Store', storeId);

    await this.checkIfExists(collaboratorDto, id);
    collaborator.name = name;
    collaborator.store = store;

    return this.collaboratorRepository.save(collaborator);
  }

  async delete(id: number) {
    const result = await this.collaboratorRepository.delete(id);
    if (result.affected === 0) this.throwNotFoundById('Collaborator', id);
  }

  private async checkIfExists(collaboratorDto: CollaboratorDto, collaboratorId: number = null) {
    const { name, storeId } = collaboratorDto;
    const collaboratorWithNameAndStore = await this.collaboratorRepository.findByNameAndStoreId(name, storeId);

    if (
      collaboratorId
        ? collaboratorWithNameAndStore && collaboratorWithNameAndStore.id !== collaboratorId
        : collaboratorWithNameAndStore
    ) {
      throw new ConflictException(`Collaborator with name: ${name} already exists in this store`);
    }
  }

  private throwNotFoundById(entityName: 'Collaborator' | 'Store', id: number) {
    throw new NotFoundException(`${entityName} with id: ${id} not found`);
  }
}
