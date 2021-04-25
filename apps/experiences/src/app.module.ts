import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CustomerModule } from './customer/customer.module';
import { StoreModule } from './store/store.module';

@Module({
  imports: [CustomerModule, StoreModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
