import { PrismaClient, Schedule } from '@prisma/client';
import { createPrismaClient } from 'src/modules/database/prisma.client';
import { PrismaScheduleQueryRepository } from './prisma-schedule.query-repository';
import { ScheduleListDTO } from '../../application/dtos/schedule-list.dto';

describe('Prisma Schedule Query Repository', () => {
  let prisma: PrismaClient;
  let queryRepository: PrismaScheduleQueryRepository;
  let createdSchedule: Schedule;

  beforeAll(async () => {
    prisma = createPrismaClient();

    await prisma.$connect();

    queryRepository = new PrismaScheduleQueryRepository(prisma as any);
  });

  beforeEach(async () => {
    await prisma.schedule.deleteMany();
    await prisma.barber.deleteMany();

    const createdBarber = await prisma.barber.create({
      data: {
        name: 'Israel Barbeiro',
        email: 'israel123@gmail.com',
        phone: '12991234567',
      },
    });

    createdSchedule = await prisma.schedule.create({
      data: {
        serviceId: 'service-123',
        barberId: createdBarber.id,
        clientId: 'client-128',
        datetime: new Date('2026-01-01T10:00:00Z'),
      },
    });
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('Should read all schedules with barber', async () => {
    const schedules = await queryRepository.listAllWithBarber();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const firstSchedule: ScheduleListDTO = schedules[0];

    expect(Array.isArray(schedules)).toBe(true);
    expect(schedules.length).toBeGreaterThan(0);
    expect(firstSchedule).toBeInstanceOf(ScheduleListDTO);
    expect(firstSchedule.id).toEqual(createdSchedule.id);
    expect(firstSchedule.serviceId).toEqual('service-123');
    expect(firstSchedule.clientId).toEqual('client-128');
    expect(firstSchedule.barberName).toEqual('Israel Barbeiro');
  });

  it('Should read a schedule by id with barber', async () => {
    const foundedSchedule = await queryRepository.getByIdWithBarber(
      createdSchedule.id,
    );

    expect(foundedSchedule).toBeDefined();
    expect(foundedSchedule).toBeInstanceOf(ScheduleListDTO);
    expect(foundedSchedule?.id).toEqual(createdSchedule.id);
    expect(foundedSchedule?.serviceId).toEqual('service-123');
    expect(foundedSchedule?.clientId).toEqual('client-128');
    expect(foundedSchedule?.barberName).toEqual('Israel Barbeiro');
  });

  it('should return null when there is no schedule founded', async () => {
    const foundedSchedule = await queryRepository.getByIdWithBarber('fakeId');

    expect(foundedSchedule).toBeNull();
  });
});
