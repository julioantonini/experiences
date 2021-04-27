import { TransactionEntity } from '@database/database/entity';
import { mockColaboratorEntity } from '@database/database/mock/colaborator.entity.mock';
import { mockStoreEntity } from '@database/database/mock/store.entity.mock';
import { mockTransactionEntity } from '@database/database/mock/transaction.entity.mock';
import { CollaboratorRepository } from '@database/database/repository/collaborator.repository';
import { CustomerRepository } from '@database/database/repository/customer.repository';
import { StoreRepository } from '@database/database/repository/store.repository';
import { TransactionRepository } from '@database/database/repository/transaction.repository';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TransactionDto } from './dto/transaction.dto';
import { TransactionService } from './transaction.service';

describe('TransactionService', () => {
  let service: TransactionService;

  const mockCustomerRepository = {
    findById: jest.fn(),
  };

  const mockStoreRepository = {
    findById: jest.fn(),
  };

  const mockColaboratorRepository = {
    findById: jest.fn(),
  };

  const mockTransactionRepository = {
    create: jest.fn(),
    save: (value: TransactionEntity) => value,
    findAllByDate: jest.fn(),
    findById: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionService,
        {
          provide: TransactionRepository,
          useValue: mockTransactionRepository,
        },
        {
          provide: CustomerRepository,
          useValue: mockCustomerRepository,
        },
        {
          provide: StoreRepository,
          useValue: mockStoreRepository,
        },
        {
          provide: CollaboratorRepository,
          useValue: mockColaboratorRepository,
        },
      ],
    }).compile();

    service = module.get<TransactionService>(TransactionService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Create transaction', () => {
    it('Given a transaction input, should throw error because costumer does not exists', async () => {
      mockCustomerRepository.findById.mockResolvedValue(null);

      await service.create(mockTransactionInput).catch((e) => {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e).toMatchObject({
          message: 'Customer with id: 1 not found',
        });
      });
      expect(mockCustomerRepository.findById).toBeCalledTimes(1);
    });

    it('Given a transaction input, should throw error because store does not exists', async () => {
      mockCustomerRepository.findById.mockResolvedValue(mockCustomerRepository);
      mockStoreRepository.findById.mockResolvedValue(null);

      await service.create(mockTransactionInput).catch((e) => {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e).toMatchObject({
          message: 'Store with id: 1 not found',
        });
      });
      expect(mockCustomerRepository.findById).toBeCalledTimes(1);
      expect(mockStoreRepository.findById).toBeCalledTimes(1);
    });

    it('Given a transaction input, should throw error because colaborator does not exists', async () => {
      mockCustomerRepository.findById.mockResolvedValue(mockCustomerRepository);
      mockStoreRepository.findById.mockResolvedValue(mockStoreEntity);
      mockColaboratorRepository.findById.mockResolvedValue(null);

      await service.create(mockTransactionInput).catch((e) => {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e).toMatchObject({
          message: 'Collaborator with id: 1 not found in store with id: 1',
        });
      });
      expect(mockCustomerRepository.findById).toBeCalledTimes(1);
      expect(mockStoreRepository.findById).toBeCalledTimes(1);
      expect(mockColaboratorRepository.findById).toBeCalledTimes(1);
    });

    it('Given a transaction input, should throw error because colaborator exists, but is not a store colaborator', async () => {
      mockCustomerRepository.findById.mockResolvedValue(mockCustomerRepository);
      mockStoreRepository.findById.mockResolvedValue(mockStoreEntity);
      mockColaboratorRepository.findById.mockResolvedValue({ ...mockColaboratorEntity, store: { id: 2 } });

      await service.create(mockTransactionInput).catch((e) => {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e).toMatchObject({
          message: 'Collaborator with id: 1 not found in store with id: 1',
        });
      });
      expect(mockCustomerRepository.findById).toBeCalledTimes(1);
      expect(mockStoreRepository.findById).toBeCalledTimes(1);
      expect(mockColaboratorRepository.findById).toBeCalledTimes(1);
    });

    it('Given a transaction input, should create a new transaction', async () => {
      mockCustomerRepository.findById.mockResolvedValue(mockCustomerRepository);
      mockStoreRepository.findById.mockResolvedValue(mockStoreEntity);
      mockColaboratorRepository.findById.mockResolvedValue({ ...mockColaboratorEntity });
      mockTransactionRepository.create.mockReturnValue(mockTransactionInput);
      jest.spyOn(mockTransactionRepository, 'save');

      const transaction = await service.create(mockTransactionInput);
      expect(transaction.custommer).toBeDefined();
      expect(transaction.store).toBeDefined();
      expect(transaction.collaborator).toBeDefined();
      expect(mockTransactionRepository.create).toHaveBeenCalledTimes(1);
      expect(mockTransactionRepository.save).toHaveBeenCalledTimes(1);
    });
  });

  describe('Find all transaction', () => {
    it('Should return all transactions', async () => {
      mockTransactionRepository.findAllByDate.mockResolvedValue([mockTransactionEntity, mockTransactionEntity]);
      const transactions = await service.findAll();
      expect(transactions).toHaveLength(2);
      expect(mockTransactionRepository.findAllByDate).toHaveBeenCalledTimes(1);
    });
  });

  describe('Find one transaction', () => {
    it('Given a transaction id, should throw error because transaction does not exists', async () => {
      mockTransactionRepository.findById.mockResolvedValue(null);
      await service.findOne(2).catch((e) => {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e).toMatchObject({
          message: 'Transaction with id: 2 not found',
        });
      });
      expect(mockTransactionRepository.findById).toBeCalledTimes(1);
    });

    it('Given a transaction id, shold return this transaction', async () => {
      mockTransactionRepository.findById.mockResolvedValue(mockTransactionEntity);
      const transaction = await service.findOne(1);
      expect(transaction).toMatchObject({ value: 19.99 });
      expect(mockTransactionRepository.findById).toHaveBeenCalledTimes(1);
    });
  });

  describe('Update transaction', () => {
    it('Given a transaction id and a input, should throw error because transaction does not exists', async () => {
      mockTransactionRepository.findById.mockResolvedValue(null);
      await service.update(2, mockTransactionInput).catch((e) => {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e).toMatchObject({
          message: 'Transaction with id: 2 not found',
        });
      });
      expect(mockTransactionRepository.findById).toBeCalledTimes(1);
    });

    it('Given a transaction id and a input, should throw error because customer does not exists', async () => {
      mockTransactionRepository.findById.mockResolvedValue(mockTransactionInput);
      mockCustomerRepository.findById.mockResolvedValue(null);

      await service.update(1, mockTransactionInput).catch((e) => {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e).toMatchObject({
          message: 'Customer with id: 1 not found',
        });
      });
      expect(mockTransactionRepository.findById).toBeCalledTimes(1);
      expect(mockCustomerRepository.findById).toBeCalledTimes(1);
    });

    it('Given a transaction id and a input, should throw error because store does not exists', async () => {
      mockTransactionRepository.findById.mockResolvedValue(mockTransactionInput);
      mockCustomerRepository.findById.mockResolvedValue(mockCustomerRepository);
      mockStoreRepository.findById.mockResolvedValue(null);
      await service.update(1, mockTransactionInput).catch((e) => {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e).toMatchObject({
          message: 'Store with id: 1 not found',
        });
      });
      expect(mockTransactionRepository.findById).toBeCalledTimes(1);
      expect(mockCustomerRepository.findById).toBeCalledTimes(1);
      expect(mockStoreRepository.findById).toBeCalledTimes(1);
    });

    it('Given a transaction id and a input, should throw error because colaborator does not exists', async () => {
      mockTransactionRepository.findById.mockResolvedValue(mockTransactionInput);
      mockCustomerRepository.findById.mockResolvedValue(mockCustomerRepository);
      mockStoreRepository.findById.mockResolvedValue(mockStoreEntity);
      mockColaboratorRepository.findById.mockResolvedValue(null);
      await service.update(1, mockTransactionInput).catch((e) => {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e).toMatchObject({
          message: 'Collaborator with id: 1 not found in store with id: 1',
        });
      });
      expect(mockTransactionRepository.findById).toBeCalledTimes(1);
      expect(mockCustomerRepository.findById).toBeCalledTimes(1);
      expect(mockStoreRepository.findById).toBeCalledTimes(1);
      expect(mockColaboratorRepository.findById).toBeCalledTimes(1);
    });

    it('Given a transaction id and a input, should throw error because colaborator exists, but is not a store colaborator', async () => {
      mockTransactionRepository.findById.mockResolvedValue(mockTransactionInput);
      mockCustomerRepository.findById.mockResolvedValue(mockCustomerRepository);
      mockStoreRepository.findById.mockResolvedValue(mockStoreEntity);
      mockColaboratorRepository.findById.mockResolvedValue({ ...mockColaboratorEntity, store: { id: 2 } });

      await service.update(1, mockTransactionInput).catch((e) => {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e).toMatchObject({
          message: 'Collaborator with id: 1 not found in store with id: 1',
        });
      });
      expect(mockTransactionRepository.findById).toBeCalledTimes(1);
      expect(mockCustomerRepository.findById).toBeCalledTimes(1);
      expect(mockStoreRepository.findById).toBeCalledTimes(1);
      expect(mockColaboratorRepository.findById).toBeCalledTimes(1);
    });

    it('Given a transaction id and a input, should update the transaction', async () => {
      mockTransactionRepository.findById.mockResolvedValue(mockTransactionInput);
      mockCustomerRepository.findById.mockResolvedValue(mockCustomerRepository);
      mockStoreRepository.findById.mockResolvedValue(mockStoreEntity);
      mockColaboratorRepository.findById.mockResolvedValue(mockColaboratorEntity);
      jest.spyOn(mockTransactionRepository, 'save');

      const transaction = await service.update(1, mockTransactionInput);
      expect(transaction.custommer).toBeDefined();
      expect(transaction.store).toBeDefined();
      expect(transaction.collaborator).toBeDefined();
      expect(mockTransactionRepository.save).toHaveBeenCalledTimes(1);
    });
  });
});

const mockTransactionInput: TransactionDto = {
  custommerId: 1,
  storeId: 1,
  collaboratorId: 1,
  date: new Date('2020-04-17T17:34:00'),
  value: 19.99,
};
