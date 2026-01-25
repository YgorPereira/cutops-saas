import { ScheduleRepository } from 'src/modules/schedule/domain/schedule.repository';
import { Schedule } from 'src/modules/schedule/domain/schedule.entity';
import { GetScheduleByIdUseCase } from './get-schedule-by-id.usecase';

describe('GetScheduleByIdUseCase', () => {
  let repositoryMock: jest.Mocked<ScheduleRepository>;
  let useCase: GetScheduleByIdUseCase;

  const baseDate = new Date('2026-01-02T10:00:00Z');
  const fakeSchedule = {
    id: 'test_schedule_id',
    serviceId: 'created_service_id',
    barberId: 'created_barber_id',
    clientId: 'created_client_id',
    datetime: new Date('2026-01-05T10:00:00Z'),
    createdAt: baseDate,
    updatedAt: baseDate,
  };

  beforeEach(() => {
    repositoryMock = {
      getById: jest.fn().mockResolvedValue(Schedule.restore(fakeSchedule)),
    };

    useCase = new GetScheduleByIdUseCase(repositoryMock);
  });

  it('should return a schedule by id sucssessfully', async () => {
    const foundedSchedule: Schedule = await useCase.execute('test_schedule_id');

    expect(foundedSchedule.id).toEqual('test_schedule_id');
    expect(foundedSchedule).toBeInstanceOf(Schedule);

    expect(repositoryMock.getById).toHaveBeenCalledTimes(1);
    expect(repositoryMock.getById).toHaveBeenCalledWith('test_schedule_id');
  });
});
