import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomRepositoryModule } from 'nestjs-typeorm-custom-repository';

import { dataSourceOptions } from './config/data-source';
import { repositories } from './repository';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), CustomRepositoryModule.forFeature(repositories)],
  exports: [CustomRepositoryModule.forFeature(repositories)],
})
export class DatabaseModule {}
