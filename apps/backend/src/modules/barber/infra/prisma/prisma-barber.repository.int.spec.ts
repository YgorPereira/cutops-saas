import { PrismaClient } from '@prisma/client';
import { PrismaBarberRepository } from './prisma-barber.repository';
import { Barber } from '../../domain/barber.entity';
import { createPrismaClient } from 'src/modules/database/prisma.client';

describe('PrismaBarberRepository', () => {
  let prisma: PrismaClient;
  let repository: PrismaBarberRepository;
  let created: Barber;
  const barberDefaultData = Barber.createBarber({
    name: 'Yuri Ryan',
    email: 'yuriryan1204@gmail.com',
    phone: '(12)123456789',
  });

  beforeAll(async () => {
    prisma = createPrismaClient();

    await prisma.$connect();

    repository = new PrismaBarberRepository(prisma as any);
  });

  beforeEach(async () => {
    // await prisma.schedule.deleteMany();
    await prisma.barber.deleteMany();

    created = await repository.create(barberDefaultData);
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('repository should be defined', () => {
    expect(repository).toBeDefined();
  });

  it('should create a barber ', async () => {
    // Updating default data email to reuse and not failure with Unique Constraint violation
    const modifiedDefaultData = barberDefaultData.updateBarber({
      email: 'yuripereira@gmail.com',
    });

    const result = await repository.create(modifiedDefaultData);

    expect(result).toBeDefined();
    expect(result).toBeInstanceOf(Barber);
    expect(result.name).toEqual('Yuri Ryan');
    expect(result.email).toEqual('yuripereira@gmail.com');
    expect(result.phone).toEqual('(12)123456789');
  });

  it('should read all barber', async () => {
    const result = await repository.listAll();

    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0]).toBeInstanceOf(Barber);
  });

  it('should read a barber by id', async () => {
    const result = await repository.getById(created.id);

    expect(result).toBeDefined();
    expect(result).toBeInstanceOf(Barber);
    expect(result?.id).toEqual(created.id);
    expect(result?.name).toEqual(created.name);
    expect(result?.email).toEqual(created.email);
    expect(result?.phone).toEqual(created.phone);
  });

  it('should read a barber by non-existent id and return null', async () => {
    const result = await repository.getById('fakeId');

    expect(result).toBe(null);
  });

  it('should update a existent barber', async () => {
    const barberToUpdate = await repository.getById(created.id);

    const updatedBarberData = barberToUpdate?.updateBarber({
      email: 'ygorrp25@gmail.com',
    });

    const result = await repository.update(updatedBarberData);

    expect(result).toBeDefined();
    expect(result).toBeInstanceOf(Barber);
    expect(result.id).toEqual(created.id);
    expect(result.email).toEqual('ygorrp25@gmail.com');
  });

  it('should throw an error when update a non-existing barber', async () => {
    const updatedBarberData = barberDefaultData.updateBarber({
      id: 'fakeId',
    });

    void expect(repository.update(updatedBarberData)).rejects.toMatchObject({
      code: 'P2025',
    });
  });

  it('should delete a barber', async () => {
    await repository.delete(created.id);

    const result = await repository.getById(created.id);

    expect(result).toBeNull();
  });
});
