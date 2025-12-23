import { Module } from '@nestjs/common';
import { DatabaseService } from './application/database.service';
import { ApplicationService } from './application/application.service';
import { PrismaService } from './prisma.service';

@Module({
  providers: [DatabaseService, ApplicationService, PrismaService]
})
export class DatabaseModule {}
