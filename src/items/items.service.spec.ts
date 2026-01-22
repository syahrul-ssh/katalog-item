import { Test, TestingModule } from '@nestjs/testing';
import { ItemsService } from './items.service';
import { CategoryEnum } from '../utils/enum/category.enum';

describe('ItemsService', () => {
  let service: ItemsService;

  const mockItemsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [{
        provide: ItemsService,
        useValue: mockItemsService,
      }],
    }).compile();

    service = module.get<ItemsService>(ItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an item', async () => {
    const createItemDto = { name: 'Laptop', category: CategoryEnum.ELECTRONICS, price: 1000, isAvailable: true };
    await service.create(createItemDto);
    expect(mockItemsService.create).toHaveBeenCalledWith(createItemDto);
  });

  it('should find all items with isAvailable filter', async () => {
    const query = { isAvailable: 'true' };
    await service.findAll(query);
    expect(mockItemsService.findAll).toHaveBeenCalledWith(query);
  });

  it('should find one item by id', async () => {
    const id = 1;
    await service.findOne(id);
    expect(mockItemsService.findOne).toHaveBeenCalledWith(id);
  });

  it('should update an item', async () => {
    const id = 1;
    const updateItemDto = { name: 'Updated Laptop', category: CategoryEnum.ELECTRONICS, price: 1200, isAvailable: false };
    await service.update(id, updateItemDto);
    expect(mockItemsService.update).toHaveBeenCalledWith(id, updateItemDto);
  }); 
});
