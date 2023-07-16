import { Inject, OnModuleInit } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { PspValidatioResponse } from 'src/stubs/psp/message';
import { PSP_SERVICE_NAME, PspServiceClient } from 'src/stubs/psp/service';

@Injectable()
export class PspService implements OnModuleInit {
  private pspService: PspServiceClient;

  constructor(@Inject(PSP_SERVICE_NAME) private client: ClientGrpc) {}

  onModuleInit() {
    this.pspService = this.client.getService<PspServiceClient>('PspService');
  }

  async pspValidation(params: {ccNumber: string, ccName: string, price: number}): Promise<PspValidatioResponse> {
    const { ccNumber, ccName, price } = params
    const res: PspValidatioResponse = await firstValueFrom(
      this.pspService.pspValidation({
        ccNumber,
        ccName,
        price
      }) as any,
    );

    return res;
  }
}
