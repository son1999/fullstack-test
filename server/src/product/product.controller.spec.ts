import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Response } from 'express';

describe('ProductController', () => {
  let controller: ProductController;
  let service: ProductService;
  const mockCreateSampleProducts = jest.fn();
  const mockGetProducts = jest.fn();

  const mockRes: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  beforeEach(async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const typedMockRes = mockRes as Response;
    const mockProductService = {
      createSampleProducts: mockCreateSampleProducts,
      getProducts: mockGetProducts,
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: ProductService,
          useValue: mockProductService,
        },
      ],
    }).compile();

    controller = module.get<ProductController>(ProductController);
    service = module.get<ProductService>(ProductService);
  });

  describe('populateSampleProducts', () => {
    it('should call createSampleProducts and return a message', async () => {
      mockCreateSampleProducts.mockResolvedValueOnce(void 0);

      const result = await controller.populateSampleProducts();

      expect(mockCreateSampleProducts).toHaveBeenCalled();
      expect(result).toEqual({ message: 'Sample products created' });
    });
  });

  describe('getProducts', () => {
    it('should call getProducts and return products', async () => {
      const mockData = {
        data: [],
        page: 1,
        take: 10,
        itemCount: 0,
        pageCount: 0,
        hasPreviousPage: false,
        hasNextPage: false,
        totalCount: 0,
      };
      (service.getProducts as jest.Mock).mockResolvedValueOnce(mockData);

      const mockRes: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const typedMockRes = mockRes as Response;

      await controller.getProducts({}, typedMockRes);

      expect(service.getProducts).toHaveBeenCalledWith({});
      expect(typedMockRes.status).toHaveBeenCalledWith(200);
      expect(typedMockRes.json).toHaveBeenCalledWith(mockData);
    });
  });
});
