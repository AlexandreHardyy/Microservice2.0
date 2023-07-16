import { Controller, Logger, UseGuards } from '@nestjs/common';
// import { ItemService } from './item.service';
import { GrpcMethod, Payload, RpcException } from '@nestjs/microservices';
import { status as RpcStatus } from '@grpc/grpc-js';
import { validate, ValidatorOptions } from 'class-validator';
import { plainToInstance } from 'class-transformer';
// import { CreateItemDto } from './dto/create-item';
import {
  PspValidatioRequest,
  PspValidatioResponse
} from './stubs/psp/message';
// import { GrpcAuthGuard } from '../auth/auth.guard';
// import { UpdateItemDto } from './dto/update-user';

@Controller()
export class PspController {
  // constructor(private readonly itemService: ItemService) {}
  constructor() {}
  
  @GrpcMethod('PspService')
  PspValidation(req: PspValidatioRequest): PspValidatioResponse {
    if (!req.ccName || !req.ccNumber || !req.price) { return { transactionStatus: 'error' } }
    return { transactionStatus: 'ok' }
  }
}
