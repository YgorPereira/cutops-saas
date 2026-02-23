import { formatInTimeZone } from 'date-fns-tz';
import { Schedule } from '../../domain/schedule.entity';
import { ScheduleListDTO } from '../../application/dtos/schedule-list.dto';

export class SchedulePresenter {
  static toHttp(schedule: Schedule) {
    return {
      id: schedule.id,
      serviceId: schedule.serviceId,
      barberId: schedule.barberId,
      clientId: schedule.clientId,
      datetime: formatInTimeZone(schedule.datetime, 'UTC', 'yyyy-MM-dd HH:mm'),
      createdAt: schedule.createdAt,
      updatedAt: schedule.updatedAt,
    };
  }

  static listToHttp(schedule: ScheduleListDTO) {
    return {
      id: schedule.id,
      serviceId: schedule.serviceId,
      barberName: schedule.barberName,
      clientId: schedule.clientId,
      datetime: formatInTimeZone(schedule.datetime, 'UTC', 'yyyy-MM-dd HH:mm'),
      createdAt: schedule.createdAt,
      updatedAt: schedule.updatedAt,
    };
  }
}
