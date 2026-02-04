import { Module } from '@nestjs/common';
import { ScheduleRepository } from './domain/schedule.repository';
import { PrismaScheduleRepository } from './infra/prisma/prisma-schedule.repository';
import { ScheduleController } from './presentation/controllers/schedule.controller';
import { CreateScheduleUseCase } from './application/usecases/create/create-schedule.usecase';
import { ListAllSchedulesUseCase } from './application/usecases/listAll/list-all-schedules.usecase';
import { GetScheduleByIdUseCase } from './application/usecases/getById/get-schedule-by-id.usecase';
import { UpdateScheduleUsecase } from './application/usecases/update/update-schedule.usecase';
import { DeleteScheduleUseCase } from './application/usecases/delete/delete-schedule.usecase';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ScheduleController],
  providers: [
    {
      provide: ScheduleRepository,
      useClass: PrismaScheduleRepository,
    },
    CreateScheduleUseCase,
    ListAllSchedulesUseCase,
    GetScheduleByIdUseCase,
    UpdateScheduleUsecase,
    DeleteScheduleUseCase,
  ],
})
export class ScheduleModule {}
