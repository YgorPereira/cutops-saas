import { PrismaService } from 'src/modules/database/prisma.service';
import { Barber } from '../../domain/barber.entity';
import { BarberRepository } from '../../domain/barber.repository';

export class PrismaBarberRepository extends BarberRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async create(barber: Barber): Promise<Barber> {
    const createdBarber = await this.prisma.barber.create({
      data: {
        name: barber.name,
        email: barber.email,
        phone: barber.phone,
      },
    });

    return Barber.restore(createdBarber);
  }
  async listAll(): Promise<Barber[]> {
    const barbers = await this.prisma.barber.findMany();

    const restoredBarbers = barbers.map((b) => Barber.restore(b));

    return restoredBarbers;
  }
  async getById(id: string): Promise<Barber | null> {
    const barber = await this.prisma.barber.findUnique({ where: { id } });

    return barber ? Barber.restore(barber) : null;
  }
  async update(barber: Barber): Promise<Barber> {
    const updatedBarber = await this.prisma.barber.update({
      where: { id: barber.id },
      data: { name: barber.name, email: barber.email, phone: barber.phone },
    });

    return Barber.restore(updatedBarber);
  }
  async delete(id: string): Promise<void> {
    await this.prisma.barber.delete({ where: { id } });
    return;
  }
}
