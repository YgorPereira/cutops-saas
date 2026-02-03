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
import { GetScheduleByIdUseCase } from '../../application/usecases/getById/get-schedule-by-id.usecase';
import { ListAllSchedulesUseCase } from '../../application/usecases/listAll/list-all-schedules.usecase';
import { UpdateScheduleUsecase } from '../../application/usecases/update/update-schedule.usecase';
import { DeleteScheduleUseCase } from '../../application/usecases/delete/delete-schedule.usecase';
import { SchedulePresenter } from '../presenters/schedule.presenter';
import { CreateScheduleRequest } from '../dtos/create-schedule.request';
import { UpdateScheduleRequest } from '../dtos/update-schedule.request';

@Controller('schedules')
export class ScheduleController {
  constructor(
    private readonly createScheduleUseCase: CreateScheduleUseCase,
    private readonly getScheduleByIdUseCase: GetScheduleByIdUseCase,
    private readonly listAllSchedulesUseCase: ListAllSchedulesUseCase,
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
    const schedules = await this.listAllSchedulesUseCase.execute();

    const convertedSchedules = schedules.map((s) =>
      SchedulePresenter.toHttp(s),
    );

    return convertedSchedules;
  }

  @Get(':id')
  async getById(@Param('id') params: { id: string }) {
    const schedule = await this.getScheduleByIdUseCase.execute(params.id);
    return SchedulePresenter.toHttp(schedule);
  }

  @Put(':id')
  async update(
    @Param('id') params: { id: string },
    @Body() body: UpdateScheduleRequest,
  ) {
    const updateInputSchedule = ScheduleMapper.toUpdateInput(params.id, body);

    const updatedSchedule =
      await this.updateScheduleUseCase.execute(updateInputSchedule);

    return SchedulePresenter.toHttp(updatedSchedule);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') params: { id: string }) {
    return await this.deleteScheduleUseCase.execute(params.id);
  }
}
