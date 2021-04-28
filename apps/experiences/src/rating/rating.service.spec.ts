import { TransactionEntity } from '@database/database/entity';
import { mockSRatingEntity } from '@database/database/mock/rating.entity.mock';
import { mockTransactionEntity } from '@database/database/mock/transaction.entity.mock';
import { RatingRepository } from '@database/database/repository/rating.repository';
import { TransactionRepository } from '@database/database/repository/transaction.repository';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { RatingDto } from './dto/rating.dto';
import { RatingService } from './rating.service';

describe('RatingService', () => {
  let service: RatingService;

  const mockRatingRepository = {
    findById: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    find: jest.fn(),
    save: (value: RatingRepository) => value,
  };

  const mockTransactionRepository = {
    findById: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RatingService,
        {
          provide: RatingRepository,
          useValue: mockRatingRepository,
        },
        {
          provide: TransactionRepository,
          useValue: mockTransactionRepository,
        },
      ],
    }).compile();

    service = module.get<RatingService>(RatingService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Create customer', () => {
    it('Given a rating input, should throw error because transaction does not exists', async () => {
      mockTransactionRepository.findById.mockResolvedValue(null);

      await service.create(mockRatingInput).catch((e) => {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e).toMatchObject({
          message: 'Transaction with id: 1 not found',
        });
      });
      expect(mockTransactionRepository.findById).toBeCalledTimes(1);
    });

    it('Given a rating input, should should create a new rating', async () => {
      mockTransactionRepository.findById.mockResolvedValue(mockTransactionEntity);
      mockRatingRepository.create.mockReturnValue(mockRatingInput);
      jest.spyOn(mockRatingRepository, 'save');

      const rating = await service.create(mockRatingInput);
      expect(rating.transaction).toBeDefined();
      expect(rating.rating).toBe(mockRatingInput.rating);
      expect(rating.comment).toBe(mockRatingInput.comment);
      expect(mockRatingRepository.save).toHaveBeenCalledTimes(1);
    });
  });

  describe('Find all ratings', () => {
    it('Should return all ratings', async () => {
      mockRatingRepository.findAll.mockResolvedValue([mockTransactionEntity, mockTransactionEntity]);
      const rating = await service.findAll();
      expect(rating).toHaveLength(2);
      expect(mockRatingRepository.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('Find one rating', () => {
    it('Given a rating id, should throw error because rating does not exists', async () => {
      mockRatingRepository.findById.mockResolvedValue(null);

      await service.findOne(2).catch((e) => {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e).toMatchObject({
          message: 'Rating with id: 2 not found',
        });
      });
      expect(mockRatingRepository.findById).toBeCalledTimes(1);
    });

    it('Given a customer id, shold return this customer', async () => {
      mockRatingRepository.findById.mockResolvedValue(mockSRatingEntity);

      const rating = await service.findOne(1);
      expect(rating).toStrictEqual(mockSRatingEntity);
      expect(mockRatingRepository.findById).toHaveBeenCalledTimes(1);
    });
  });
});

const mockRatingInput: RatingDto = {
  transactionId: 1,
  rating: 10,
  comment: 'very very good',
};
