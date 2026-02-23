/* eslint-disable @typescript-eslint/unbound-method */
import { ScheduleNotFoundError } from 'src/modules/schedule/domain/errors/schedule-not-found.error';
import { GetScheduleByIdWithBarberUseCase } from './get-schedule-by-id-with-barber.usecase';
import { ScheduleQueryRepository } from '../../repositories/schedule.query.repository';
import { ScheduleListDTO } from '../../dtos/schedule-list.dto';

describe('GetScheduleByIdWithBarberUseCase', () => {
  let repositoryMock: jest.Mocked<ScheduleQueryRepository>;
  let useCase: GetScheduleByIdWithBarberUseCase;

  const baseDate = new Date('2026-01-02T10:00:00Z');
  const fakeSchedule = {
    id: 'test_schedule_id',
    serviceId: 'created_service_id',
    barber: { name: 'Felipe Barbosa' },
    clientId: 'created_client_id',
    datetime: new Date('2026-01-05T10:00:00Z'),
    createdAt: baseDate,
    updatedAt: baseDate,
  };

  beforeEach(() => {
    repositoryMock = {
      listAllWithBarber: jest.fn(),
      getByIdWithBarber: jest
        .fn()
        .mockResolvedValue(
          new ScheduleListDTO(
            fakeSchedule.id,
            fakeSchedule.serviceId,
            fakeSchedule.barber.name,
            fakeSchedule.clientId,
            fakeSchedule.datetime,
            fakeSchedule.createdAt,
            fakeSchedule.updatedAt,
          ),
        ),
    };

    useCase = new GetScheduleByIdWithBarberUseCase(repositoryMock);
  });

  it('should return a schedule by id with a barber sucssessfully', async () => {
    const foundedSchedule: ScheduleListDTO =
      await useCase.execute('test_schedule_id');

    expect(foundedSchedule.id).toEqual('test_schedule_id');
    expect(foundedSchedule).toBeInstanceOf(ScheduleListDTO);

    expect(repositoryMock.getByIdWithBarber).toHaveBeenCalledTimes(1);
    expect(repositoryMock.getByIdWithBarber).toHaveBeenCalledWith(
      'test_schedule_id',
    );
  });

  it('should throw a ScheduleNotFoundError when try to get a schedule with non-existent id', async () => {
    repositoryMock.getByIdWithBarber.mockResolvedValueOnce(null);

    await expect(useCase.execute('non_existent_id')).rejects.toThrow(
      ScheduleNotFoundError,
    );
  });
});
