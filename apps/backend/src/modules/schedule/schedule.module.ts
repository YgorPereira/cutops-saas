import { Module } from '@nestjs/common';
import { ScheduleRepository } from './domain/schedule.repository';
import { PrismaScheduleRepository } from './infra/prisma/prisma-schedule.repository';
import { ScheduleController } from './presentation/controllers/schedule.controller';

@Module({
  controllers: [ScheduleController],
  providers: [
    {
      provide: ScheduleRepository,
      useClass: PrismaScheduleRepository,
    },
  ],
})
export class ScheduleModule {}
