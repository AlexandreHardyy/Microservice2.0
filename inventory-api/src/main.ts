import './config/tracing';
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
  await app.listen(3004);
  Logger.log(`Inventory API is listening on port ${cs.get('PORT') || 4004}`);
}
bootstrap();
