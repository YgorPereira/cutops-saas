import { Schedule } from 'src/modules/schedule/domain/schedule.entity';
import { ScheduleRepository } from 'src/modules/schedule/domain/schedule.repository';

export class GetScheduleByIdUseCase {
  constructor(private scheduleRepository: ScheduleRepository) {}

  async execute(id: string): Promise<Schedule | null> {
    return this.scheduleRepository.getById(id);
  }
}
