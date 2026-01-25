import { PrismaService } from 'src/modules/database/prisma.service';
import { Schedule } from '../../domain/schedule.entity';
import { ScheduleRepository } from '../../domain/schedule.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
class PrismaScheduleRepository extends ScheduleRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async create(data: Schedule): Promise<Schedule> {
    const created = await this.prisma.schedule.create({
      data: {
        clientId: data.clientId,
        barberId: data.barberId,
        serviceId: data.serviceId,
        datetime: data.datetime,
      },
    });

    return Schedule.restore(created);
  }

  async listAll(): Promise<Schedule[]> {
    const schedules = await this.prisma.schedule.findMany();

    const mappedSchedules = schedules.map((s) => Schedule.restore(s));

    return mappedSchedules;
  }

  async getById(id: string): Promise<Schedule | null> {
    const schedule = await this.prisma.schedule.findUnique({
      where: { id },
    });

    return schedule ? Schedule.restore(schedule) : null;
  }

  async update(data: Schedule): Promise<Schedule> {
    const updated = await this.prisma.schedule.update({
      where: { id: data.id },
      data: {
        clientId: data.clientId,
        barberId: data.barberId,
        serviceId: data.serviceId,
        datetime: data.datetime,
      },
    });

    return Schedule.restore(updated);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.schedule.delete({ where: { id } });
    return;
  }
}

export { PrismaScheduleRepository };
