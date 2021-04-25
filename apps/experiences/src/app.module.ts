import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CustomerModule } from './customer/customer.module';

@Module({
  imports: [CustomerModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
