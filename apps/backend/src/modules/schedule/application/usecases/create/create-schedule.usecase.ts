import { ScheduleRepository } from 'src/modules/schedule/domain/schedule.repository';
import { CreateScheduleInput } from './create-schedule.dto';
import { Schedule } from 'src/modules/schedule/domain/schedule.entity';

export class CreateScheduleUseCase {
  constructor(private scheduleRepositoy: ScheduleRepository) {}

  async execute(input: CreateScheduleInput): Promise<Schedule> {
    const scheduleToCreate = Schedule.createSchedule(input);
    return await this.scheduleRepositoy.create(scheduleToCreate);
  }
}
