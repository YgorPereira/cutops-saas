import { PrismaService } from 'src/modules/database/prisma.service';
import { ScheduleQueryRepository } from '../../application/repositories/schedule.query.repository';
import { ScheduleListDTO } from '../../application/dtos/schedule-list.dto';

export class PrismaScheduleQueryRepository extends ScheduleQueryRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async listAllWithBarber(): Promise<ScheduleListDTO[]> {
    const schedules = await this.prisma.schedule.findMany({
      include: {
        barber: { select: { name: true } },
      },
    });

    const convertedSchedules = schedules.map(
      (s) =>
        new ScheduleListDTO(
          s.id,
          s.serviceId,
          s.barber.name,
          s.clientId,
          s.datetime,
          s.createdAt,
          s.updatedAt,
        ),
    );

    return convertedSchedules;
  }

  async getByIdWithBarber(id: string): Promise<ScheduleListDTO | null> {
    const foundedSchedule = await this.prisma.schedule.findUnique({
      where: { id },
      include: {
        barber: {
          select: {
            name: true,
          },
        },
      },
    });

    return foundedSchedule
      ? new ScheduleListDTO(
          foundedSchedule.id,
          foundedSchedule.serviceId,
          foundedSchedule.barber.name,
          foundedSchedule.clientId,
          foundedSchedule.datetime,
          foundedSchedule.created,
          foundedSchedule.updatedAt,
        )
      : null;
  }
}
