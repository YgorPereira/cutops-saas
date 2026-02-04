import { Schedule } from 'src/modules/schedule/domain/schedule.entity';
import { ListAllSchedulesUseCase } from './list-all-schedules.usecase';
import { ScheduleRepository } from 'src/modules/schedule/domain/schedule.repository';

describe('ListAllSchedulesUseCase', () => {
  let repositoryMock: jest.Mocked<ScheduleRepository>;
  let useCase: ListAllSchedulesUseCase;

  const schedulesMock: Schedule[] = [
    Schedule.createSchedule({
      serviceId: 'created_service_id',
      barberId: 'created_barber_id',
      clientId: 'created_client_id',
      datetime: new Date('2026-01-05T10:00:00Z'),
    }),
  ];

  beforeEach(() => {
    repositoryMock = {
      listAll: jest.fn().mockResolvedValue(schedulesMock),
    };

    useCase = new ListAllSchedulesUseCase(repositoryMock);
  });

  it('should return all schedules sucssesfully', async () => {
    const schedulesList: Schedule[] = await useCase.execute();

    expect(schedulesList).toEqual(schedulesMock);
    expect(schedulesList).toHaveLength(1);

    expect(repositoryMock.listAll).toHaveBeenCalledTimes(1);
  });
});
