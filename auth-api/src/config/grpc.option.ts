import { ConfigService } from '@nestjs/config';
import {
  ClientProviderOptions,
  GrpcOptions,
  Transport,
} from '@nestjs/microservices';
import { addReflectionToGrpcConfig } from 'nestjs-grpc-reflection';
import { join } from 'path';
import { AUTH_PACKAGE_NAME } from 'src/stubs/auth/service';
import { USER_PACKAGE_NAME } from 'src/stubs/user/service';

export default (cs: ConfigService): GrpcOptions => {
  return addReflectionToGrpcConfig({
    transport: Transport.GRPC,
    options: {
      package: AUTH_PACKAGE_NAME,
      url: `0.0.0.0:${cs.get('PORT') || 4003}`,
      loader: {
        includeDirs: [join(__dirname, '../proto')],
      },
      protoPath: [join(__dirname, '../proto/auth/service.proto')],
    },
  });
};

export const userGrpcOptions = (cs: ConfigService): ClientProviderOptions => ({
  name: USER_PACKAGE_NAME,
  transport: Transport.GRPC,
  options: {
    url: cs.get('USER_API_URL'),
    package: USER_PACKAGE_NAME,
    loader: {
      includeDirs: [join(__dirname, '../proto')],
    },
    protoPath: [join(__dirname, '../proto/user/service.proto')],
    keepalive: {
      // Send keepalive pings every 10 seconds, default is 2 hours.
      keepaliveTimeMs: 10 * 1000,
      // Keepalive ping timeout after 5 seconds, default is 20 seconds.
      keepaliveTimeoutMs: 5 * 1000,
      // Allow keepalive pings when there are no gRPC calls.
      keepalivePermitWithoutCalls: 1,
    },
  },
});
