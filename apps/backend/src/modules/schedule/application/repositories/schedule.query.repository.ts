import { ScheduleListDTO } from '../dtos/schedule-list.dto';

export abstract class ScheduleQueryRepository {
  abstract listAllWithBarber(): Promise<ScheduleListDTO[]>;
  abstract getByIdWithBarber(id: string): Promise<ScheduleListDTO | null>;
}
