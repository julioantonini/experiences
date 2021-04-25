import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CollaboratorModule } from './collaborator/collaborator.module';
import { CustomerModule } from './customer/customer.module';
import { StoreModule } from './store/store.module';

@Module({
  imports: [CustomerModule, StoreModule, CollaboratorModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
