import { Module } from '@nestjs/common';
import { ScheduleController } from './presentation/schedule.controller';
import { ScheduleRepository } from './domain/schedule.repository';
import { PrismaScheduleRepository } from './infra/prisma/prisma-schedule.repository';

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
