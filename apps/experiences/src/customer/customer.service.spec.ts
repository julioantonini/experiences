import { CustomerEntity } from '@database/database/entity';
import { mockCustomerEntity } from '@database/database/mock/customer.entity.mock';
import { CustomerRepository } from '@database/database/repository/customer.repository';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CustomerService } from './customer.service';
import { CustomerDto } from './dto/customer.dto';

describe('CustomerService', () => {
  let service: CustomerService;

  const mockCustomerRepository = {
    findById: jest.fn(),
    findByEmail: jest.fn(),
    findByCpf: jest.fn(),
    create: jest.fn(),
    find: jest.fn(),
    save: (value: CustomerEntity) => value,
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerService,
        {
          provide: CustomerRepository,
          useValue: mockCustomerRepository,
        },
      ],
    }).compile();

    service = module.get<CustomerService>(CustomerService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Create customer', () => {
    it('Given a customer input, should throw error because e-mail already in use', async () => {
      mockCustomerRepository.findByEmail.mockResolvedValue(mockCustomerEntity);

      await service.create(mockCustomerInput).catch((e) => {
        expect(e).toBeInstanceOf(ConflictException);
        expect(e).toMatchObject({
          message: 'E-mail already in use',
        });
      });
      expect(mockCustomerRepository.findByEmail).toBeCalledTimes(1);
    });

    it('Given a customer input, should throw error because cpf already in use', async () => {
      mockCustomerRepository.findByEmail.mockResolvedValue(null);
      mockCustomerRepository.findByCpf.mockResolvedValue(mockCustomerEntity);

      await service.create(mockCustomerInput).catch((e) => {
        expect(e).toBeInstanceOf(ConflictException);
        expect(e).toMatchObject({
          message: 'Cpf already in use',
        });
      });
      expect(mockCustomerRepository.findByEmail).toBeCalledTimes(1);
      expect(mockCustomerRepository.findByCpf).toBeCalledTimes(1);
    });

    it('Given a customer input, should create a new transaction', async () => {
      mockCustomerRepository.findByEmail.mockResolvedValue(null);
      mockCustomerRepository.findByCpf.mockResolvedValue(null);
      mockCustomerRepository.create.mockReturnValue(mockCustomerInput);
      jest.spyOn(mockCustomerRepository, 'save');

      const customer = await service.create(mockCustomerInput);
      expect(customer.name).toBe(mockCustomerInput.name);
      expect(customer.email).toBe(mockCustomerInput.email);
      expect(customer.phone).toBe(mockCustomerInput.phone);
      expect(customer.cpf).toBe(mockCustomerInput.cpf);
      expect(mockCustomerRepository.create).toHaveBeenCalledTimes(1);
      expect(mockCustomerRepository.save).toHaveBeenCalledTimes(1);
    });
  });

  describe('Find all customers', () => {
    it('Should return all customers', async () => {
      mockCustomerRepository.find.mockResolvedValue([mockCustomerEntity, mockCustomerEntity]);
      const transactions = await service.findAll();
      expect(transactions).toHaveLength(2);
      expect(mockCustomerRepository.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('Find one customers', () => {
    it('Given a customer id, should throw error because customer does not exists', async () => {
      mockCustomerRepository.findById.mockResolvedValue(null);

      await service.findOne(2).catch((e) => {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e).toMatchObject({
          message: 'Customer with id: 2 not found',
        });
      });
      expect(mockCustomerRepository.findById).toBeCalledTimes(1);
    });

    it('Given a customer id, shold return this customer', async () => {
      mockCustomerRepository.findById.mockResolvedValue(mockCustomerEntity);

      const customer = await service.findOne(1);
      expect(customer).toStrictEqual(mockCustomerEntity);
      expect(mockCustomerRepository.findById).toHaveBeenCalledTimes(1);
    });
  });

  describe('Update customer', () => {
    it('Given a customer input, should throw error because customer does not exists', async () => {
      mockCustomerRepository.findById.mockResolvedValue(null);

      await service.update(2, mockCustomerInput).catch((e) => {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e).toMatchObject({
          message: 'Customer with id: 2 not found',
        });
      });
      expect(mockCustomerRepository.findById).toBeCalledTimes(1);
    });

    it('Given a customer input, should throw error because e-mail already in use for another customer', async () => {
      mockCustomerRepository.findById.mockResolvedValue(mockCustomerEntity);
      mockCustomerRepository.findByEmail.mockResolvedValue({ ...mockCustomerEntity, id: 2 });

      await service.update(1, mockCustomerInput).catch((e) => {
        expect(e).toBeInstanceOf(ConflictException);
        expect(e).toMatchObject({
          message: 'E-mail already in use',
        });
      });
      expect(mockCustomerRepository.findById).toBeCalledTimes(1);
      expect(mockCustomerRepository.findByEmail).toBeCalledTimes(1);
    });

    it('Given a customer input, should throw error because cpf already in use for another customer', async () => {
      mockCustomerRepository.findById.mockResolvedValue(mockCustomerEntity);
      mockCustomerRepository.findByEmail.mockResolvedValue(mockCustomerEntity);
      mockCustomerRepository.findByCpf.mockResolvedValue({ ...mockCustomerEntity, id: 2 });

      await service.update(1, mockCustomerInput).catch((e) => {
        expect(e).toBeInstanceOf(ConflictException);
        expect(e).toMatchObject({
          message: 'Cpf already in use',
        });
      });
      expect(mockCustomerRepository.findById).toBeCalledTimes(1);
      expect(mockCustomerRepository.findByEmail).toBeCalledTimes(1);
      expect(mockCustomerRepository.findByCpf).toBeCalledTimes(1);
    });

    it('Given a customer input, should should update the customer', async () => {
      mockCustomerRepository.findById.mockResolvedValue(mockCustomerEntity);
      mockCustomerRepository.findByEmail.mockResolvedValue(mockCustomerEntity);
      mockCustomerRepository.findByCpf.mockResolvedValue(mockCustomerEntity);
      jest.spyOn(mockCustomerRepository, 'save');

      const customer = await service.update(1, mockCustomerInput);
      expect(customer.name).toBe(mockCustomerInput.name);
      expect(customer.email).toBe(mockCustomerInput.email);
      expect(customer.phone).toBe(mockCustomerInput.phone);
      expect(customer.cpf).toBe(mockCustomerInput.cpf);
      expect(mockCustomerRepository.save).toHaveBeenCalledTimes(1);
    });
  });
});

const mockCustomerInput: CustomerDto = {
  name: 'new customer',
  email: 'new@email.com',
  phone: '1238883888',
  cpf: '99606725065',
};
