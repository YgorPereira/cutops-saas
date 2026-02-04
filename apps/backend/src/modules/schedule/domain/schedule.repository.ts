import { Injectable } from '@nestjs/common';
import { Schedule } from './schedule.entity';

@Injectable()
export abstract class ScheduleRepository {
  abstract create(schedule: Schedule): Promise<Schedule>;
  abstract listAll(filter?: any): Promise<Schedule[]>;
  abstract getById(id: string): Promise<Schedule | null>;
  abstract update(schedule: Schedule): Promise<Schedule>;
  abstract delete(id: string): Promise<void>;
}
