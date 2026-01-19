import { PrismaService } from 'src/modules/database/prisma.service';
import { Schedule } from '../../domain/schedule.entity';
import { ScheduleRepository } from '../../domain/schedule.repository';

class PrismaScheduleRepository extends ScheduleRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async create(data: Schedule): Promise<string> {
    // eslint-disable-next-line no-useless-catch
    try {
      const created = await this.prisma.schedule.create({
        data: {
          clientId: data.clientId,
          barberId: data.barberId,
          serviceId: data.serviceId,
          datetime: data.datetime,
        },
      });

      return created.id;
    } catch (error) {
      throw error;
    }
  }
  readAll(): Promise<Schedule[]> {
    throw new Error('Method not implemented.');
  }
  readById(scheduleId: string): Promise<Schedule | null> {
    throw new Error('Method not implemented.');
  }
  update(data: any): Promise<void> {
    throw new Error('Method not implemented.');
  }
  delete(scheduleId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

export { PrismaScheduleRepository };
