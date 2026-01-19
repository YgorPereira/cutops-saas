import { PrismaClient } from '@prisma/client';
import { PrismaScheduleRepository } from './prisma-schedule.repository';
import { createPrismaClient } from 'src/modules/database/prisma.client';
import { Schedule } from '../../domain/schedule.entity';

describe('PrismaScheduleRepository', () => {
  let prisma: PrismaClient;
  let repository: PrismaScheduleRepository;

  beforeEach(async () => {
    prisma = createPrismaClient();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    await prisma.$connect();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    repository = new PrismaScheduleRepository(prisma as any);
  });

  afterAll(async () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    await prisma.$disconnect();
  });

  it('repository should be defined', () => {
    expect(repository).toBeDefined();
  });

  it('should create a schedule', async () => {
    const datetime = new Date('2024-12-31T10:00:00Z');

    const schedule = Schedule.create({
      serviceId: 'A1',
      barberId: 'B1',
      clientId: 'C1',
      datetime,
    });

    const created = repository.create(schedule);

    expect(created).toBeDefined();
  });
});
