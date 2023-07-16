import {
  ClientProviderOptions,
  GrpcOptions,
  Transport,
} from '@nestjs/microservices';
import { addReflectionToGrpcConfig } from 'nestjs-grpc-reflection';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import { AUTH_PACKAGE_NAME } from 'src/stubs/auth/service';
import { PSP_PACKAGE_NAME } from 'src/stubs/psp/service';
import { ChannelCredentials, ServerCredentials } from '@grpc/grpc-js';
import { ITEM_PACKAGE_NAME } from '../stubs/item/service';

export default (cs: ConfigService) =>
  addReflectionToGrpcConfig({
    transport: Transport.GRPC,
    options: {
      package: ITEM_PACKAGE_NAME,
      url: `0.0.0.0:${cs.get('PORT') || 4004}`,
      loader: {
        includeDirs: [join(__dirname, '../proto')],
      },
      protoPath: [join(__dirname, '../proto/item/service.proto')],
      credentials: ServerCredentials.createInsecure(),
    },
  } as GrpcOptions);

export const authGrpcOptions = (cs: ConfigService): ClientProviderOptions => {
  return {
    name: AUTH_PACKAGE_NAME,
    transport: Transport.GRPC,
    options: {
      url: cs.get('AUTH_API_URL'),
      package: AUTH_PACKAGE_NAME,
      loader: {
        includeDirs: [join(__dirname, '../proto')],
      },
      protoPath: [join(__dirname, '../proto/auth/service.proto')],
      keepalive: {
        // Send keepalive pings every 10 seconds, default is 2 hours.
        keepaliveTimeMs: 10 * 1000,
        // Keepalive ping timeout after 5 seconds, default is 20 seconds.
        keepaliveTimeoutMs: 5 * 1000,
        // Allow keepalive pings when there are no gRPC calls.
        keepalivePermitWithoutCalls: 1,
      },
      credentials: ChannelCredentials.createInsecure(),
    },
  };
};

export const pspGrpcOptions = (cs: ConfigService): ClientProviderOptions => {
  return {
    name: PSP_PACKAGE_NAME,
    transport: Transport.GRPC,
    options: {
      url: cs.get('PSP_API_URL'),
      package: PSP_PACKAGE_NAME,
      loader: {
        includeDirs: [join(__dirname, '../proto')],
      },
      protoPath: [join(__dirname, '../proto/psp/service.proto')],
      keepalive: {
        // Send keepalive pings every 10 seconds, default is 2 hours.
        keepaliveTimeMs: 10 * 1000,
        // Keepalive ping timeout after 5 seconds, default is 20 seconds.
        keepaliveTimeoutMs: 5 * 1000,
        // Allow keepalive pings when there are no gRPC calls.
        keepalivePermitWithoutCalls: 1,
      },
      credentials: ChannelCredentials.createInsecure(),
    },
  };
};
