import { ScheduleRepository } from 'src/modules/schedule/domain/schedule.repository';

export class DeleteScheduleUseCase {
  constructor(private scheduleRepository: ScheduleRepository) {}

  async execute(id: string) {
    return await this.scheduleRepository.delete(id);
  }
}
