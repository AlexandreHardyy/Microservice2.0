import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { PrismaService } from 'src/prisma.service';
import { AuthModule } from '../auth/auth.module';
import { PspModule } from 'src/psp/psp.module';

@Module({
  imports: [AuthModule, PspModule],
  controllers: [ItemController],
  providers: [ItemService, PrismaService],
  exports: [ItemService],
})
export class ItemModule {}
