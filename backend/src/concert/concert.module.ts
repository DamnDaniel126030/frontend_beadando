import { Module } from '@nestjs/common';
import { ConcertService } from './concert.service';
import { ConcertController } from './concert.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ConcertController],
  providers: [ConcertService, PrismaService],
})
export class ConcertModule {}
