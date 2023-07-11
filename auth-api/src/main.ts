import { NestFactory } from '@nestjs/core';
import grpcOption from './config/grpc.option';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const cs = app.get(ConfigService);
  app.connectMicroservice(grpcOption(cs));
  app.enableShutdownHooks();
  await app.startAllMicroservices();
  Logger.log(`Auth API is listening on port ${cs.get('PORT') || 4002}`);
}
bootstrap();
