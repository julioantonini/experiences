import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CollaboratorModule } from './collaborator/collaborator.module';
import { CustomerModule } from './customer/customer.module';
import { StoreModule } from './store/store.module';
import { TransactionModule } from './transaction/transaction.module';
import { RatingModule } from './rating/rating.module';

@Module({
  imports: [CustomerModule, StoreModule, CollaboratorModule, TransactionModule, RatingModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
