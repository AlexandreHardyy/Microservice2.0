import { GrpcOptions, Transport } from '@nestjs/microservices';
import { addReflectionToGrpcConfig } from 'nestjs-grpc-reflection';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import { ServerCredentials } from '@grpc/grpc-js';
import { PSP_PACKAGE_NAME } from '../stubs/psp/service';

export default (cs: ConfigService) =>
  addReflectionToGrpcConfig({
    transport: Transport.GRPC,
    options: {
      package: PSP_PACKAGE_NAME,
      url: `0.0.0.0:${cs.get('PORT') || 4005}`,
      loader: {
        includeDirs: [join(__dirname, '../proto')],
      },
      protoPath: [join(__dirname, '../proto/psp/service.proto')],
      credentials: ServerCredentials.createInsecure(),
    },
  } as GrpcOptions);
