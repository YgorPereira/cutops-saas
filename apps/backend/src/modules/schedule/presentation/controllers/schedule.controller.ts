import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  HttpCode,
} from '@nestjs/common';

// importing useCases

import { ScheduleMapper } from '../mappers/schedule.mapper';
import { CreateScheduleUseCase } from '../../application/usecases/create/create-schedule.usecase';
import { UpdateScheduleUsecase } from '../../application/usecases/update/update-schedule.usecase';
import { DeleteScheduleUseCase } from '../../application/usecases/delete/delete-schedule.usecase';
import { SchedulePresenter } from '../presenters/schedule.presenter';
import { CreateScheduleRequest } from '../dtos/create-schedule.request';
import { UpdateScheduleRequest } from '../dtos/update-schedule.request';
import { GetScheduleByIdWithBarberUseCase } from '../../application/usecases/getByIdWithBarber/get-schedule-by-id-with-barber.usecase';
import { ListAllSchedulesWithBarberUseCase } from '../../application/usecases/listAllWithBarber/list-all-schedules.usecase';

@Controller('schedules')
export class ScheduleController {
  constructor(
    private readonly createScheduleUseCase: CreateScheduleUseCase,
    private readonly getScheduleWithBarberByIdUseCase: GetScheduleByIdWithBarberUseCase,
    private readonly listAllSchedulesWithBarberUseCase: ListAllSchedulesWithBarberUseCase,
    private readonly updateScheduleUseCase: UpdateScheduleUsecase,
    private readonly deleteScheduleUseCase: DeleteScheduleUseCase,
  ) {}

  @Post()
  async create(@Body() body: CreateScheduleRequest) {
    const data = ScheduleMapper.toCreateInput(body);

    const createdSchedule = await this.createScheduleUseCase.execute(data);

    return SchedulePresenter.toHttp(createdSchedule);
  }

  @Get()
  async listAll() {
    const schedules = await this.listAllSchedulesWithBarberUseCase.execute();

    const convertedSchedules = schedules.map((s) =>
      SchedulePresenter.listToHttp(s),
    );

    return convertedSchedules;
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    const schedule = await this.getScheduleWithBarberByIdUseCase.execute(id);
    return SchedulePresenter.listToHttp(schedule);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: UpdateScheduleRequest) {
    const updateInputSchedule = ScheduleMapper.toUpdateInput(id, body);

    const updatedSchedule =
      await this.updateScheduleUseCase.execute(updateInputSchedule);

    return SchedulePresenter.toHttp(updatedSchedule);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    return await this.deleteScheduleUseCase.execute(id);
  }
}
