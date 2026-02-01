import { Schedule } from '../../domain/schedule.entity';
import { format } from 'date-fns';

export class SchedulePresenter {
  static toHttp(schedule: Schedule) {
    return {
      id: schedule.id,
      serviceId: schedule.serviceId,
      barberId: schedule.barberId,
      clientId: schedule.clientId,
      datetime: format(schedule.datetime, 'yyyy-MM-dd HH:mm'),
      createdAt: schedule.createdAt,
    };
  }
}
