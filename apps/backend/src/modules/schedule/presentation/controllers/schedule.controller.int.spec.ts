/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { CreateScheduleUseCase } from '../../application/usecases/create/create-schedule.usecase';
import { UpdateScheduleUsecase } from '../../application/usecases/update/update-schedule.usecase';
import { ListAllSchedulesUseCase } from '../../application/usecases/listAll/list-all-schedules.usecase';
import { GetScheduleByIdUseCase } from '../../application/usecases/getById/get-schedule-by-id.usecase';
import { DeleteScheduleUseCase } from '../../application/usecases/delete/delete-schedule.usecase';
import { ScheduleController } from './schedule.controller';
import { CreateScheduleRequest } from '../dtos/create-schedule.request';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Schedule } from '../../domain/schedule.entity';
import request from 'supertest';
import { randomUUID } from 'crypto';
import { UpdateScheduleRequest } from '../dtos/update-schedule.request';
import { ScheduleNotFoundError } from '../../domain/errors/schedule-not-found.error';
import { ScheduleNotFoundFilter } from '../filters/schedule-not-found.filter';
// import { rejects } from 'assert';

describe('ScheduleController (integration)', () => {
  let app: INestApplication;
  const id = randomUUID();

  let createUseCase: CreateScheduleUseCase;
  let listAllUseCase: ListAllSchedulesUseCase;
  let getByIdUseCase: GetScheduleByIdUseCase;
  let updateUseCase: UpdateScheduleUsecase;
  let deleteUseCase: DeleteScheduleUseCase;

  const scheduleToCreate = {
    id: id,
    serviceId: id,
    barberId: id,
    clientId: id,
    datetime: new Date('2026-01-02T10:30Z'),
  };

  const createdSchedule: Schedule = Schedule.createSchedule(scheduleToCreate);

  beforeAll(async () => {
    const modulesFixture: TestingModule = await Test.createTestingModule({
      controllers: [ScheduleController],
      providers: [
        {
          provide: CreateScheduleUseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: UpdateScheduleUsecase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: ListAllSchedulesUseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: GetScheduleByIdUseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: DeleteScheduleUseCase,
          useValue: { execute: jest.fn() },
        },
      ],
    }).compile();

    app = modulesFixture.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    (app.useGlobalFilters(new ScheduleNotFoundFilter()), await app.init());

    createUseCase = modulesFixture.get(CreateScheduleUseCase);
    listAllUseCase = modulesFixture.get(ListAllSchedulesUseCase);
    getByIdUseCase = modulesFixture.get(GetScheduleByIdUseCase);
    updateUseCase = modulesFixture.get(UpdateScheduleUsecase);
    deleteUseCase = modulesFixture.get(DeleteScheduleUseCase);
  });

  it('POST /schedules should create and return a Schedule', async () => {
    const payload: CreateScheduleRequest = {
      serviceId: id,
      barberId: id,
      clientId: id,
      datetime: '2026-01-02T10:30:00Z',
    };

    const schedule = Schedule.createSchedule(scheduleToCreate);

    jest.spyOn(createUseCase, 'execute').mockResolvedValue(schedule);

    const response = await request(app.getHttpServer())
      .post('/schedules')
      .send(payload)
      .expect(201);

    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: schedule.id,
        serviceId: payload.serviceId,
        barberId: payload.barberId,
        clientId: payload.clientId,
      }),
    );
    expect(response.body.datetime).toContain('2026-01-02 10:30');

    expect(createUseCase.execute).toHaveBeenCalledTimes(1);
    expect(createUseCase.execute).toHaveBeenCalledWith(
      expect.objectContaining({
        serviceId: payload.serviceId,
        barberId: payload.barberId,
        clientId: payload.clientId,
        datetime: expect.any(Date),
      }),
    );
  });

  it('POST /schedules should fail with missing requires field', async () => {
    await request(app.getHttpServer())
      .post('/schedules')
      .send({
        barberId: id,
        clientId: id,
        datetime: '2026-01-02T10:30:00Z',
      })
      .expect(400);
  });

  it('POST /schedules should fail with invalid datetime string', async () => {
    await request(app.getHttpServer())
      .post('/schedules')
      .send({
        serviceId: id,
        barberId: id,
        clientId: id,
        datetime: 'invalid-datetime-str',
      })
      .expect(400);
  });

  it('GET /schedules should return a list of converted from Schedule', async () => {
    const firstSchedule = Schedule.createSchedule(scheduleToCreate);
    const secondSchedule = Schedule.createSchedule(scheduleToCreate);

    const schedulesList = [firstSchedule, secondSchedule];

    jest.spyOn(listAllUseCase, 'execute').mockResolvedValue(schedulesList);

    const response = await request(app.getHttpServer())
      .get('/schedules')
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body).toHaveLength(2);

    expect(response.body[0]).toBeInstanceOf(Object);
    expect(response.body[0]).toEqual(
      expect.objectContaining({
        barberId: firstSchedule.barberId,
        serviceId: firstSchedule.serviceId,
        clientId: firstSchedule.clientId,
      }),
    );

    expect(listAllUseCase.execute).toHaveBeenCalledTimes(1);
  });

  it('GET /schedules should return a empty list when dont find any schedule', async () => {
    jest.spyOn(listAllUseCase, 'execute').mockResolvedValue([]);

    const response = await request(app.getHttpServer())
      .get('/schedules')
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body).toHaveLength(0);

    expect(listAllUseCase.execute).toHaveBeenCalledTimes(1);
  });

  it('GET /schedules/:id should return a object converted from schedule', async () => {
    jest.spyOn(getByIdUseCase, 'execute').mockResolvedValue(createdSchedule);

    const response = await request(app.getHttpServer())
      .get(`/schedules/${scheduleToCreate.id}`)
      .expect(200);

    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: createdSchedule.id,
        barberId: createdSchedule.barberId,
        serviceId: createdSchedule.serviceId,
        clientId: createdSchedule.clientId,
      }),
    );

    expect(getByIdUseCase.execute).toHaveBeenCalledTimes(1);
  });

  it('GET /schedules/:id should catch a ScheduleNotFoundError when try to get with non-existent id', async () => {
    jest
      .spyOn(getByIdUseCase, 'execute')
      .mockRejectedValue(new ScheduleNotFoundError());
    const response = await request(app.getHttpServer())
      .get(`/schedules/${scheduleToCreate.id}`)
      .expect(404);

    expect(response.body).toEqual({
      statusCode: 404,
      message: 'Schedule not found.',
    });
  });

  it('PUT /schedules/:id should return a updated schedule object', async () => {
    const payload: UpdateScheduleRequest = {
      clientId: randomUUID(),
      serviceId: randomUUID(),
      barberId: randomUUID(),
      datetime: '2026-01-03T11:18Z',
    };

    const convertedToSchedule = Schedule.createSchedule({
      ...payload,
      id: scheduleToCreate.id,
      datetime: new Date(payload.datetime),
    });

    jest.spyOn(updateUseCase, 'execute').mockResolvedValue(convertedToSchedule);

    const response = await request(app.getHttpServer())
      .put(`/schedules/${scheduleToCreate.id}`)
      .send(payload)
      .expect(200);

    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toEqual(
      expect.objectContaining({
        barberId: payload.barberId,
        serviceId: payload.serviceId,
        clientId: payload.clientId,
        datetime: '2026-01-03 11:18',
      }),
    );
  });

  it('PUT /schedules/:id should catch a ScheduleNotFoundError when try to put with non-existent id', async () => {
    const payload: UpdateScheduleRequest = {
      clientId: randomUUID(),
      serviceId: randomUUID(),
      barberId: randomUUID(),
      datetime: '2026-01-03T11:18Z',
    };

    jest
      .spyOn(updateUseCase, 'execute')
      .mockRejectedValue(new ScheduleNotFoundError());

    const response = await request(app.getHttpServer())
      .put(`/schedules/${scheduleToCreate.id}`)
      .send(payload)
      .expect(404);

    expect(response.body).toEqual({
      statusCode: 404,
      message: 'Schedule not found.',
    });
  });

  it('DELETE /schedules/:id should delete a Schedule and return null', async () => {
    jest.spyOn(deleteUseCase, 'execute').mockResolvedValue(undefined);

    const response = await request(app.getHttpServer())
      .delete(`/schedules/${scheduleToCreate.id}`)
      .expect(204);

    expect(response.body).toEqual({});
  });

  it('DELETE /schedules/:id should catch a ScheduleNotFoundError when try to delete with non-existent id', async () => {
    jest
      .spyOn(deleteUseCase, 'execute')
      .mockRejectedValue(new ScheduleNotFoundError());

    const response = await request(app.getHttpServer())
      .delete(`/schedules/${scheduleToCreate.id}`)
      .expect(404);

    expect(response.body).toEqual({
      statusCode: 404,
      message: 'Schedule not found.',
    });
  });
});
