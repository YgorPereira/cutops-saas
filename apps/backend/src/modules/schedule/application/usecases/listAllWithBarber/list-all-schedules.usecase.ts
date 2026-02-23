import { Injectable } from '@nestjs/common';
import { ScheduleQueryRepository } from '../../repositories/schedule.query.repository';
import { ScheduleListDTO } from '../../dtos/schedule-list.dto';

@Injectable()
export class ListAllSchedulesWithBarberUseCase {
  constructor(private scheduleQueryRepository: ScheduleQueryRepository) {}

  async execute(): Promise<ScheduleListDTO[]> {
    const schedules = await this.scheduleQueryRepository.listAllWithBarber();
    return schedules;
  }
}
