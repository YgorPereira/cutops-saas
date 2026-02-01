import { CreateScheduleInput } from '../../application/usecases/create/create-schedule.dto';
import { UpdateScheduleInput } from '../../application/usecases/update/update-schedule.dto';
import { CreateScheduleRequest } from '../dtos/create-schedule.request';
import { UpdateScheduleRequest } from '../dtos/update-schedule.request';

export class ScheduleMapper {
  static toCreateInput(req: CreateScheduleRequest): CreateScheduleInput {
    return {
      barberId: req.barberId,
      serviceId: req.serviceId,
      clientId: req.clientId,
      datetime: new Date(req.datetime),
    };
  }

  static toUpdateInput(
    id: string,
    req: UpdateScheduleRequest,
  ): UpdateScheduleInput {
    return {
      id: id,
      barberId: req.barberId,
      serviceId: req.serviceId,
      clientId: req.clientId,
      datetime: new Date(req.datetime),
    };
  }
}
