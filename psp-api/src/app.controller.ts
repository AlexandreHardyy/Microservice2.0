import { Controller, Logger, UseGuards } from '@nestjs/common';
import { GrpcMethod, Payload, RpcException } from '@nestjs/microservices';
import { PspValidatioRequest, PspValidatioResponse } from './stubs/psp/message';

@Controller()
export class PspController {
  @GrpcMethod('PspService')
  PspValidation(req: PspValidatioRequest): PspValidatioResponse {
    if (!req.ccName || !req.ccNumber || !req.price || req.price < 1) {
      return { transactionStatus: 'error' };
    }
    return { transactionStatus: 'ok' };
  }
}
