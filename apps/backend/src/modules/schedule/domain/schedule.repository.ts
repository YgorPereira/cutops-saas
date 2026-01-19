import { Schedule } from './schedule.entity';

abstract class ScheduleRepository {
  abstract create(scheduleData: Schedule): Promise<string>;
  abstract readAll(filter?: any): Promise<Schedule[]>;
  abstract readById(scheduleId: string): Promise<Schedule | null>;
  abstract update(scheduleId: string, updateData: any): Promise<void>;
  abstract delete(scheduleId: string): Promise<void>;
}

export { ScheduleRepository };
