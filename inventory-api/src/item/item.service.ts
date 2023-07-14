import { Injectable, Logger } from '@nestjs/common';
import { Item, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ItemService {
  constructor(private prisma: PrismaService) {}

  async item(
    userWhereUniqueInput: Prisma.ItemWhereUniqueInput,
  ): Promise<Item | null> {
    return this.prisma.item.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async items(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ItemWhereUniqueInput;
    where?: Prisma.ItemWhereInput;
    orderBy?: Prisma.ItemOrderByWithRelationInput;
  }): Promise<Item[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.item.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createItem(data: Prisma.ItemCreateInput): Promise<Item> {
    return this.prisma.item.create({
      data,
    });
  }

  async updateItem(params: {
    where: Prisma.ItemWhereUniqueInput;
    data: Prisma.ItemUpdateInput;
  }): Promise<Item> {
    const { where, data } = params;
    return this.prisma.item.update({
      data,
      where,
    });
  }

  async deleteUser(where: Prisma.ItemWhereUniqueInput): Promise<Item> {
    return this.prisma.item.delete({
      where,
    });
  }
}
