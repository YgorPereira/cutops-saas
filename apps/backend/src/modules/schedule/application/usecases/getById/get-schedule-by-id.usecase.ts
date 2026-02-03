import { Schedule } from 'src/modules/schedule/domain/schedule.entity';
import { ScheduleRepository } from 'src/modules/schedule/domain/schedule.repository';
import { ScheduleNotFoundError } from '../../../domain/errors/schedule-not-found.error';

export class GetScheduleByIdUseCase {
  constructor(private scheduleRepository: ScheduleRepository) {}

  async execute(id: string): Promise<Schedule> {
    const foundedSchedule = await this.scheduleRepository.getById(id);

    if (!foundedSchedule) {
      throw new ScheduleNotFoundError();
    }

    return foundedSchedule;
  }
}
