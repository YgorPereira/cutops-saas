import { PrismaClient } from '@prisma/client';
import { PrismaScheduleRepository } from './prisma-schedule.repository';
import { createPrismaClient } from 'src/modules/database/prisma.client';
import { Barber } from 'src/modules/barber/domain/barber.entity';
import { Schedule } from '../../domain/schedule.entity';

describe('PrismaScheduleRepository', () => {
  let prisma: PrismaClient;
  let repository: PrismaScheduleRepository;
  let created: Schedule;

  let scheduleDefaultData: Schedule;

  let restoredBarber: Barber;

  beforeAll(async () => {
    // Create the prisma client
    prisma = createPrismaClient();

    // Open a connection with database by prisma client
    await prisma.$connect();

    // Instance a concrete repository implemehantion
    repository = new PrismaScheduleRepository(prisma as any);
  });

  beforeEach(async () => {
    // Delete all schedules before each test
    await prisma.schedule.deleteMany();

    // Deleta all barbers before each test
    await prisma.barber.deleteMany();

    const createdBarber = await prisma.barber.create({
      data: {
        name: 'Yuri Ryan',
        email: 'yuriryan1204@gmail.com',
        phone: '(12)123456789',
      },
    });

    restoredBarber = Barber.restore(createdBarber);

    scheduleDefaultData = Schedule.createSchedule({
      serviceId: 'service-123',
      barberId: restoredBarber.id,
      clientId: 'client-789',
      datetime: new Date('2026-01-01T10:00:00Z'),
    });

    // Seed data for tests
    created = await repository.create(scheduleDefaultData);
  });

  afterAll(async () => {
    // Close the connection after run all tests
    await prisma.$disconnect();
  });

  it('repository should be defined', () => {
    expect(repository).toBeDefined();
  });

  it('should create a schedule', () => {
    expect(created).toBeDefined();
    expect(created).toBeInstanceOf(Schedule);
  });

  it('should read all schedules', async () => {
    const schedules = await repository.listAll();

    expect(schedules).toBeDefined();
    expect(Array.isArray(schedules)).toBe(true);
    expect(schedules.length).toBeGreaterThan(0);
    expect(schedules[0]).toBeInstanceOf(Schedule);
  });

  it('should read a schedule by id', async () => {
    const schedule = await repository.getById(created.id);

    expect(schedule).toBeDefined();
    expect(schedule?.id).toBe(created.id);
    expect(schedule).toBeInstanceOf(Schedule);
  });

  it('should read a schedule by non-existent id and return null', async () => {
    const nonExistentSchedule = await repository.getById('fakeId');

    expect(nonExistentSchedule).toBe(null);
  });

  it('should update a schedule', async () => {
    const scheduleToUpdate = await repository.getById(created.id);

    const newDatetime = new Date('2026-01-02T11:00:00Z');

    const newScheduleData = scheduleToUpdate.updateSchedule({
      datetime: newDatetime,
    });

    const updatedSchedule = await repository.update(newScheduleData);

    expect(updatedSchedule).toBeDefined();
    expect(updatedSchedule.datetime).toEqual(newDatetime);
    expect(updatedSchedule.id).toBe(created.id);
    expect(updatedSchedule.updatedAt).toBeDefined();
    expect(updatedSchedule.updatedAt).toBeInstanceOf(Date);
  });

  it('should throw when updating non-existent schedule', () => {
    const newDatetime = new Date('2026-01-02T11:00:00Z');

    const scheduleToUpdate = scheduleDefaultData.updateSchedule({
      id: 'fake_id',
      datetime: newDatetime,
    });

    void expect(repository.update(scheduleToUpdate)).rejects.toMatchObject({
      code: 'P2025',
    });
  });

  it('should delete a schedule', async () => {
    await repository.delete(created.id);

    const deleteSchedule = await repository.getById(created.id);

    expect(deleteSchedule).toBeNull();
  });
});
