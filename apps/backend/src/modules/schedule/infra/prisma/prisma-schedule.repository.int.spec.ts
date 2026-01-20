import { PrismaClient } from '@prisma/client';
import { PrismaScheduleRepository } from './prisma-schedule.repository';
import { createPrismaClient } from 'src/modules/database/prisma.client';
import { Schedule } from '../../domain/schedule.entity';

describe('PrismaScheduleRepository', () => {
  let prisma: PrismaClient;
  let repository: PrismaScheduleRepository;
  let created: Schedule;

  const scheduleDefault: Schedule = Schedule.createSchedule({
    serviceId: 'service-123',
    barberId: 'barber-456',
    clientId: 'client-789',
    datetime: new Date('2026-01-01T10:00:00Z'),
  });

  beforeEach(async () => {
    prisma = createPrismaClient();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    await prisma.$connect();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    repository = new PrismaScheduleRepository(prisma as any);

    // Seed data for testing
    created = await repository.create(scheduleDefault);
  });

  afterAll(async () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    await prisma.$disconnect();
  });

  it('repository should be defined', () => {
    expect(repository).toBeDefined();
  });

  it('should create a schedule', async () => {
    expect(created).toBeDefined();
    expect(created).toBeInstanceOf(Schedule);
  });

  it('should read all schedules', async () => {
    const schedules = await repository.readAll();

    expect(schedules).toBeDefined();
    expect(Array.isArray(schedules)).toBe(true);
    expect(schedules.length).toBeGreaterThan(0);
    expect(schedules[0]).toBeInstanceOf(Schedule);
  });

  it('should read a schedule by id', async () => {
    const schedule = await repository.readById(created.id);

    expect(schedule).toBeDefined();
    expect(schedule?.id).toBe(created.id);
    expect(schedule).toBeInstanceOf(Schedule);
  });

  it('should update a schedule', async () => {
    const scheduleToUpdate = await repository.readById(created.id);

    const newDatetime = new Date('2026-01-02T11:00:00Z');

    const newScheduleData = scheduleToUpdate?.updateSchedule({
      datetime: newDatetime,
    });

    const updatedSchedule = await repository.update(newScheduleData);

    expect(updatedSchedule).toBeDefined();
    expect(updatedSchedule.datetime).toEqual(newDatetime);
    expect(updatedSchedule.id).toBe(created.id);
    expect(updatedSchedule.updatedAt).toBeDefined();
    expect(updatedSchedule.updatedAt).toBeInstanceOf(Date);
  });

  it('should delete a schedule', async () => {
    await repository.delete(created.id);

    const deleteSchedule = await repository.readById(created.id);

    expect(deleteSchedule).toBeNull();
  });
});
