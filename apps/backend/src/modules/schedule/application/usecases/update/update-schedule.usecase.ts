import { ScheduleRepository } from 'src/modules/schedule/domain/schedule.repository';
import { UpdateScheduleInput } from './update-schedule.dto';
import { ScheduleNotFoundError } from '../../../domain/errors/schedule-not-found.error';

export class UpdateScheduleUsecase {
  constructor(private scheduleRepository: ScheduleRepository) {}

  async execute(input: UpdateScheduleInput) {
    const currentSchedule = await this.scheduleRepository.getById(input.id);

    if (!currentSchedule) {
      throw new ScheduleNotFoundError();
    }

    const updatedSchedule = currentSchedule.updateSchedule(input);

    return await this.scheduleRepository.update(updatedSchedule);
  }
}
