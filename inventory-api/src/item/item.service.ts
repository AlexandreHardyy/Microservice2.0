import { Injectable, Logger } from '@nestjs/common';
import { Item, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ItemService {
  constructor(private prisma: PrismaService) {}

  async createItem(data: Prisma.ItemCreateInput): Promise<Item> {
    return this.prisma.item.create({
      data,
    });
  }
}
