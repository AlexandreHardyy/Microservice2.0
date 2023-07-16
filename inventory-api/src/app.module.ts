import { Module } from '@nestjs/common';
import { GrpcReflectionModule } from 'nestjs-grpc-reflection';
import { ConfigModule, ConfigService } from '@nestjs/config';
import grpcOption from './config/grpc.option';
import { ItemModule } from './item/item.module';
import { AuthModule } from './auth/auth.module';
import { PspModule } from './psp/psp.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: process.env.NODE_ENV === 'production',
      isGlobal: true,
    }),
    GrpcReflectionModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cs: ConfigService) => grpcOption(cs),
    }),
    ItemModule,
    AuthModule,
    PspModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
