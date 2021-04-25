import { StoreEntity } from '@database/database/entity';
import { StoreRepository } from '@database/database/repository/store.repository';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { StoreDto } from './dto/store.dto';

@Injectable()
export class StoreService {
  constructor(private storeRepository: StoreRepository) {}

  async create(storeDto: StoreDto): Promise<StoreEntity> {
    await this.checkIfExists(storeDto);
    const store = this.storeRepository.create(storeDto);
    return this.storeRepository.save(store);
  }

  async findAll(): Promise<StoreEntity[]> {
    return this.storeRepository.find({ relations: ['collaborators'] });
  }

  async findOne(id: number) {
    const store = await this.storeRepository.findById(id);
    if (!store) this.throwNotFoundById(id);

    return store;
  }

  async update(id: number, storeDto: StoreDto) {
    const store = await this.storeRepository.findById(id);
    if (!store) this.throwNotFoundById(id);

    await this.checkIfExists(storeDto, id);

    return this.storeRepository.save({
      ...store,
      ...storeDto,
    });
  }

  async delete(id: number) {
    const result = await this.storeRepository.delete(id);
    if (result.affected === 0) this.throwNotFoundById(id);
  }

  private async checkIfExists(storeDto: StoreDto, storeId: number = null) {
    const { name } = storeDto;

    const storeWithName = await this.storeRepository.findByName(name);
    if (storeId ? storeWithName && storeWithName.id !== storeId : storeWithName) {
      throw new ConflictException('Name already in use');
    }
  }

  private throwNotFoundById(id: number) {
    throw new NotFoundException(`Store with id: ${id} not found`);
  }
}
