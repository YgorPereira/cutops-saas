import { ScheduleNotFoundError } from '../../../domain/errors/schedule-not-found.error';
import { Injectable } from '@nestjs/common';
import { ScheduleQueryRepository } from '../../repositories/schedule.query.repository';
import { ScheduleListDTO } from '../../dtos/schedule-list.dto';

@Injectable()
export class GetScheduleByIdWithBarberUseCase {
  constructor(private scheduleQueryRepository: ScheduleQueryRepository) {}

  async execute(id: string): Promise<ScheduleListDTO> {
    const foundedSchedule =
      await this.scheduleQueryRepository.getByIdWithBarber(id);

    if (!foundedSchedule) {
      throw new ScheduleNotFoundError();
    }

    return foundedSchedule;
  }
}
