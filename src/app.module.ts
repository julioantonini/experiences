import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

const typeOrmOptions = require('./config/database/typeorm.config');

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmOptions)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
