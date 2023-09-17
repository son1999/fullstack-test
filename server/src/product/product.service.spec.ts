import { Test } from '@nestjs/testing';
import { ProductService } from './product.service';
import { ILike } from 'typeorm';

const mockRepository = () => ({
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  count: jest.fn(),
});

describe('ProductService', () => {
  let productService;
  let productsRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: 'ProductRepository',
          useFactory: mockRepository,
        },
      ],
    }).compile();

    productService = await module.get<ProductService>(ProductService);
    productsRepository = await module.get('ProductRepository');
  });

  describe('createSampleProducts', () => {
    it('should generate and save sample products', async () => {
      productsRepository.save.mockResolvedValue(true);
  
      expect(await productService.createSampleProducts()).toBeTruthy();
      expect(productsRepository.create).toBeCalled();
      expect(productsRepository.save).toBeCalled();
    });
  });

  describe('getProducts', () => {
    it('should get products with pagination', async () => {
      const result = [];
      productsRepository.find.mockResolvedValue(result);
      productsRepository.count.mockResolvedValue(0);
  
      const paginationDto = { page: 1 };
      const response = await productService.getProducts(paginationDto);
  
      expect(response.data).toEqual(result);
      expect(productsRepository.find).toBeCalled();
      expect(productsRepository.count).toBeCalled();
    });
  });

  it('should search for products based on name query', async () => {
    const result = [];
    const mockQuery = { name: 'SampleProduct' };
    productsRepository.find.mockResolvedValue(result);
    productsRepository.count.mockResolvedValue(0);

    await productService.getProducts(mockQuery);

    expect(productsRepository.find).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { name: ILike('%SampleProduct%') },
      })
    );
    expect(productsRepository.count).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { name: ILike('%SampleProduct%') },
      })
    );
  });

  it('should search for products based on category query', async () => {
    const result = [];
    const mockQuery = { category: 'SampleCategory' };
    productsRepository.find.mockResolvedValue(result);
    productsRepository.count.mockResolvedValue(0);

    await productService.getProducts(mockQuery);

    expect(productsRepository.find).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { category: ILike('%SampleCategory%') },
      })
    );
    expect(productsRepository.count).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { category: ILike('%SampleCategory%') },
      })
    );
  });

  it('should search for products based on name and category query', async () => {
    const result = [];
    const mockQuery = { name: 'SampleProduct', category: 'SampleCategory' };
    productsRepository.find.mockResolvedValue(result);
    productsRepository.count.mockResolvedValue(0);

    await productService.getProducts(mockQuery);

    expect(productsRepository.find).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { 
          name: ILike('%SampleProduct%'),
          category: ILike('%SampleCategory%') 
        },
      })
    );
    expect(productsRepository.count).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { 
          name: ILike('%SampleProduct%'),
          category: ILike('%SampleCategory%') 
        },
      })
    );
  });
});
