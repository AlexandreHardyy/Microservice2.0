import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';
import { PspService } from './psp.service';
import { pspGrpcOptions } from 'src/config/grpc.option';
import { PSP_SERVICE_NAME } from 'src/stubs/psp/service';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        inject: [ConfigService],
        name: PSP_SERVICE_NAME,
        useFactory: (cs: ConfigService) => pspGrpcOptions(cs),
      },
    ]),
  ],
  providers: [PspService],
  exports: [PspService],
})
export class PspModule {}
