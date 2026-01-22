import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private itemsRepository: Repository<Item>,
  ) {}

  async create(createItemDto: CreateItemDto) {
    const existingItem = await this.itemsRepository.findOneBy({ name: createItemDto.name });
    if (existingItem) {
      throw new ConflictException('An item with this name already exists.');
    }
    const newItem = this.itemsRepository.create(createItemDto);
    return this.itemsRepository.save(newItem);
  }

  async findAll() {
    return this.itemsRepository.find();
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
    const updatedItem = Object.assign(item, updateItemDto);
    return await this.itemsRepository.save(updatedItem);
  }

  async remove(id: number) {
    const item = await this.findOne(id);
    return await this.itemsRepository.remove(item);
  }
}
