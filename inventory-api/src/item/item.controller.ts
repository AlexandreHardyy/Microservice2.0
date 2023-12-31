import { Controller, Logger, UseGuards } from '@nestjs/common';
import { ItemService } from './item.service';
import { GrpcMethod, Payload, RpcException } from '@nestjs/microservices';
import { status as RpcStatus } from '@grpc/grpc-js';
import { validate, ValidatorOptions } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { CreateItemDto } from './dto/create-item';
import {
  CreateItemRequest,
  DeleteRequest,
  DeleteResponse,
  FindRequest,
  FindResponse,
  UpdateRequest,
  UpdateResponse,
  BuyRequest,
  BuyResponse,
} from '../stubs/item/message';
import { GrpcAuthGuard } from '../auth/auth.guard';
import { UpdateItemDto } from './dto/update-user';
import { PspService } from 'src/psp/psp.service';

@Controller()
export class ItemController {
  constructor(
    private readonly itemService: ItemService,
    private readonly pspService: PspService,
  ) {}

  @UseGuards(GrpcAuthGuard)
  @GrpcMethod('ItemService')
  async CreateItem(req: CreateItemRequest): Promise<any> {
    try {
      const dto: CreateItemDto = await this.validateDto(req, CreateItemDto);
      const item = await this.itemService.createItem(dto);
      return item;
    } catch (error) {
      this.handlePrismaErr(error);
    }
  }

  @UseGuards(GrpcAuthGuard)
  @GrpcMethod('ItemService')
  async Find(@Payload() req: FindRequest): Promise<FindResponse> {
    try {
      Object.keys(req).forEach((key) => req[key] === '' && delete req[key]);
      const where = {
        ...req,
        id: req.id ? +req.id : undefined,
      };
      return { item: (await this.itemService.items({ where })) as any };
    } catch (error) {
      this.handlePrismaErr(error);
    }
  }

  @UseGuards(GrpcAuthGuard)
  @GrpcMethod('UserService')
  async UdpateItem(@Payload() req: UpdateRequest): Promise<UpdateResponse> {
    try {
      const dto: UpdateItemDto = await this.validateDto(req, UpdateItemDto, {
        whitelist: true,
        skipMissingProperties: true,
      });

      const user = await this.itemService.updateItem({
        where: {
          id: +req.id,
        },
        data: dto,
      });

      return { item: user as any };
    } catch (error) {
      this.handlePrismaErr(error);
    }
  }

  @GrpcMethod('ItemService')
  async DeleteItem(req: DeleteRequest): Promise<DeleteResponse> {
    const item = await this.itemService.deleteItem({
      id: +req.id,
    });

    return { item: item as any };
  }

  private handlePrismaErr(err: Error) {
    console.error(err);
    if (err instanceof RpcException) throw err;
    else throw new RpcException(err);
  }

  private async validateDto(
    data: any,
    Dto: any,
    validatorOptions?: ValidatorOptions,
  ) {
    const dto = plainToInstance(Dto, data);
    const errors = await validate(dto, validatorOptions);

    if (errors.length > 0) {
      throw new RpcException({
        code: RpcStatus.INVALID_ARGUMENT,
        message: errors
          .map(
            ({ value, property, constraints }) =>
              `${value} is not a valid ${property} value (${Object.values(
                constraints,
              ).join(', ')})`,
          )
          .join('\n'),
      });
    }
    return dto as typeof Dto;
  }

  @UseGuards(GrpcAuthGuard)
  @GrpcMethod('ItemService')
  async BuyItem(req: BuyRequest): Promise<BuyResponse> {
    const item = await this.itemService.item({ id: +req.id });

    if (!item) {
      return {
        message: 'item not found',
      };
    }

    if (item.quantity <= 0) {
      return {
        message: 'item out of stock',
      };
    }

    const price = item.price;

    const response = await this.pspService.pspValidation({
      ccNumber: `${req.ccNumber}`,
      ccName: `${req.ccName}`,
      price,
    });

    if (response.transactionStatus === 'ok') {
      const newItem = await this.itemService.updateItem({
        where: {
          id: +req.id,
        },
        data: {
          quantity: item.quantity - 1,
        },
      });
      return {
        item: newItem as any,
        message: 'transaction validate',
      };
    } else {
      return {
        message: 'transaction error',
      };
    }
  }
}
