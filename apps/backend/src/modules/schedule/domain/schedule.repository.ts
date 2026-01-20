import { Schedule } from './schedule.entity';

abstract class ScheduleRepository {
  abstract create(schedule: Schedule): Promise<Schedule>;
  abstract readAll(filter?: any): Promise<Schedule[]>;
  abstract readById(id: string): Promise<Schedule | null>;
  abstract update(schedule: Schedule): Promise<Schedule>;
  abstract delete(id: string): Promise<void>;
}

export { ScheduleRepository };
