import { CollaboratorRepository } from '@database/database/repository/collaborator.repository';
import { CustomerRepository } from '@database/database/repository/customer.repository';
import { StoreRepository } from '@database/database/repository/store.repository';
import { TransactionRepository } from '@database/database/repository/transaction.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { TransactionService } from './transaction.service';

describe('TransactionService', () => {
  let service: TransactionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionService,
        TransactionRepository,
        CustomerRepository,
        StoreRepository,
        CollaboratorRepository,
      ],
    }).compile();

    service = module.get<TransactionService>(TransactionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
