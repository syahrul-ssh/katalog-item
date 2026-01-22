import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { Repository } from 'typeorm';
import { Category } from '../categories/entities/category.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private itemsRepository: Repository<Item>,
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async create(createItemDto: CreateItemDto) {
    const existingItem = await this.itemsRepository.findOneBy({ name: createItemDto.name });
    if (existingItem) {
      throw new ConflictException('An item with this name already exists.');
    }
    const category = await this.categoriesRepository.findOneBy({ name: createItemDto.category });
    if (!category) {
      throw new BadRequestException('Category not found.');
    }
    const newItem = this.itemsRepository.create(createItemDto);
    return this.itemsRepository.save(newItem);
  }

  async findAll(query: any) {
    let isAvailableFilter = true;
    if (query.isAvailable !== undefined) {
      isAvailableFilter = query.isAvailable === 'true';
    }
    return this.itemsRepository.find({ where: { isAvailable: isAvailableFilter } });
  }

  async findOne(id: number) {
    const item = await this.itemsRepository.findOneBy({ id });
    if (!item) {
      throw new NotFoundException('Item not found.');
    }
    return item;
  }

  async update(id: number, updateItemDto: UpdateItemDto) {
    const item = await this.findOne(id);
    if (updateItemDto.name && updateItemDto.name !== item.name) {
      const existingItem = await this.itemsRepository.findOneBy({ name: updateItemDto.name });
      if (existingItem && existingItem.id !== id) {
        throw new ConflictException('An item with this name already exists.');
      }
    }
    const category = await this.categoriesRepository.findOneBy({ name: updateItemDto.category });
    if (updateItemDto.category && !category) {
      throw new BadRequestException('Category not found.');
    }
    const updatedItem = Object.assign(item, updateItemDto);
    return await this.itemsRepository.save(updatedItem);
  }

  async remove(id: number) {
    const item = await this.findOne(id);
    return await this.itemsRepository.remove(item);
  }
}
