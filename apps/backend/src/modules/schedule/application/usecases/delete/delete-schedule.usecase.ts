import { ScheduleRepository } from 'src/modules/schedule/domain/schedule.repository';
import { ScheduleNotFoundError } from '../../../domain/errors/schedule-not-found.error';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DeleteScheduleUseCase {
  constructor(private scheduleRepository: ScheduleRepository) {}

  async execute(id: string) {
    const currentSchedule = await this.scheduleRepository.getById(id);

    if (!currentSchedule) {
      throw new ScheduleNotFoundError();
    }

    return await this.scheduleRepository.delete(id);
  }
}
