import { formatInTimeZone } from 'date-fns-tz';
import { Schedule } from '../../domain/schedule.entity';
import { format } from 'date-fns';

export class SchedulePresenter {
  static toHttp(schedule: Schedule) {
    return {
      id: schedule.id,
      serviceId: schedule.serviceId,
      barberId: schedule.barberId,
      clientId: schedule.clientId,
      datetime: formatInTimeZone(schedule.datetime, 'UTC', 'yyyy-MM-dd HH:mm'),
      createdAt: schedule.createdAt,
    };
  }
}
