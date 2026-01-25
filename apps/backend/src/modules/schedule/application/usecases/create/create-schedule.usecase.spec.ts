import { Schedule } from 'src/modules/schedule/domain/schedule.entity';
import { CreateScheduleUseCase } from './create-schedule.usecase';
import { ScheduleRepository } from 'src/modules/schedule/domain/schedule.repository';
import { CreateScheduleInput } from './create-schedule.dto';

describe('CreateScheduleUsecase', () => {
  let repository: jest.Mocked<ScheduleRepository>;
  let useCase: CreateScheduleUseCase;

  const fakeSchedule = {
    id: 'test_id',
    serviceId: 'test_service_id',
    barberId: 'test_barber_id',
    clientId: 'test_id',
    datetime: new Date('2026-01-02T11:00:00Z'),
    createdAt: new Date('2026-01-02T10:00:00Z'),
    updatedAt: new Date('2026-01-02T10:30:00Z'),
  };

  beforeEach(() => {
    repository = {
      create: jest.fn().mockResolvedValue(Schedule.restore(fakeSchedule)),
    };

    useCase = new CreateScheduleUseCase(repository);
  });

  it('should create a schedule suscefully', async () => {
    const scheduleToCreate: CreateScheduleInput = {
      serviceId: 'test_service_id',
      barberId: 'test_barber_id',
      clientId: 'test_id',
      datetime: new Date('2026-01-02T11:00:00Z'),
    };

    const createdSchedule = await useCase.execute(scheduleToCreate);

    expect(createdSchedule).toBeDefined();
    expect(createdSchedule).toBeInstanceOf(Schedule);
    expect(createdSchedule.id).toEqual(fakeSchedule.id);
  });
});
