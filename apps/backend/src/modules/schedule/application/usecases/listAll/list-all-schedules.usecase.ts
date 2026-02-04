import { Injectable } from '@nestjs/common';
import { Schedule } from 'src/modules/schedule/domain/schedule.entity';
import { ScheduleRepository } from 'src/modules/schedule/domain/schedule.repository';

@Injectable()
export class ListAllSchedulesUseCase {
  constructor(private scheduleRepository: ScheduleRepository) {}

  async execute(): Promise<Schedule[]> {
    return this.scheduleRepository.listAll();
  }
}
