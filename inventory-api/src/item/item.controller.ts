import { Controller, Logger, UseGuards } from '@nestjs/common';
import { ItemService } from './item.service';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import { status as RpcStatus } from '@grpc/grpc-js';
import { validate, ValidatorOptions } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { CreateItemDto } from './dto/create-item';
import { CreateItemRequest } from '../stubs/item/message';
import { GrpcAuthGuard } from '../auth/auth.guard';

@Controller()
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

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
}
