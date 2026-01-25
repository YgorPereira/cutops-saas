import { ScheduleRepository } from 'src/modules/schedule/domain/schedule.repository';
import { UpdateScheduleInput } from './update-schedule.dto';

export class UpdateScheduleUsecase {
  constructor(private scheduleRepository: ScheduleRepository) {}

  async execute(input: UpdateScheduleInput) {
    const currentSchedule = await this.scheduleRepository.getById(input.id);

    if (!currentSchedule) {
      throw new Error('Schedule not found');
    }

    const updatedSchedule = currentSchedule.updateSchedule(input);

    return await this.scheduleRepository.update(updatedSchedule);
  }
}
