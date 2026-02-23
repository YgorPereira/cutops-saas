import { ListAllSchedulesWithBarberUseCase } from './list-all-schedules.usecase';
import { ScheduleListDTO } from '../../dtos/schedule-list.dto';
import { ScheduleQueryRepository } from '../../repositories/schedule.query.repository';

describe('ListAllSchedulesUseCase', () => {
  let repositoryMock: jest.Mocked<ScheduleQueryRepository>;
  let useCase: ListAllSchedulesWithBarberUseCase;

  const baseDate = new Date('2026-01-02T10:00:00Z');
  const fakeScheduleListDTO = new ScheduleListDTO(
    'fakeId',
    'service-123',
    'felipe barbosa',
    'client-123',
    new Date('2026-01-05T10:00:00Z'),
    baseDate,
    baseDate,
  );

  const schedulesMock: ScheduleListDTO[] = [fakeScheduleListDTO];

  beforeEach(() => {
    repositoryMock = {
      listAllWithBarber: jest.fn().mockResolvedValue(schedulesMock),
      getByIdWithBarber: jest.fn(),
    };

    useCase = new ListAllSchedulesWithBarberUseCase(repositoryMock);
  });

  it('should return all schedules sucssesfully', async () => {
    const schedulesList: ScheduleListDTO[] = await useCase.execute();

    expect(schedulesList).toEqual(schedulesMock);
    expect(schedulesList).toHaveLength(1);

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(repositoryMock.listAllWithBarber).toHaveBeenCalledTimes(1);
  });
});
