import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { repositories } from './repository';

const typeOrmOptions = require('./config/typeorm.config');

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmOptions),
    TypeOrmModule.forFeature(repositories),
  ],
  exports: [TypeOrmModule.forFeature(repositories)],
})
export class DatabaseModule {}
