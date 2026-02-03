import { ScheduleRepository } from 'src/modules/schedule/domain/schedule.repository';
import { UpdateScheduleUsecase } from './update-schedule.usecase';
import { Schedule } from 'src/modules/schedule/domain/schedule.entity';
import { UpdateScheduleInput } from './update-schedule.dto';
import { ScheduleNotFoundError } from 'src/modules/schedule/domain/errors/schedule-not-found.error';

describe('UpdateScheduleUseCase', () => {
  let repositoryMock: jest.Mocked<ScheduleRepository>;
  let useCase: UpdateScheduleUsecase;
  const baseDate = new Date('2026-01-02T10:00:00Z');

  const fakeCreatedSchedule = {
    id: 'test_schedule_id',
    serviceId: 'created_service_id',
    barberId: 'created_barber_id',
    clientId: 'created_client_id',
    datetime: new Date('2026-01-05T10:00:00Z'),
    createdAt: baseDate,
    updatedAt: baseDate,
  };

  const fakeUpdatedSchedule = {
    ...fakeCreatedSchedule,
    serviceId: 'updated_service_id',
    barberId: 'updated_barber_id',
    updatedAt: new Date('2026-01-02T11:00:00Z'),
  };

  beforeEach(() => {
    repositoryMock = {
      create: jest.fn(),
      listAll: jest.fn(),
      delete: jest.fn(),
      getById: jest
        .fn()
        .mockResolvedValue(Schedule.restore(fakeCreatedSchedule)),
      update: jest
        .fn()
        .mockResolvedValue(Schedule.restore(fakeUpdatedSchedule)),
    };

    useCase = new UpdateScheduleUsecase(repositoryMock);
  });

  it('should update a schedule sucssefully', async () => {
    const scheduleToUpdate: UpdateScheduleInput = {
      id: 'test_schedule_id',
      serviceId: fakeUpdatedSchedule.serviceId,
      barberId: fakeUpdatedSchedule.barberId,
    };

    const updatedSchedule = await useCase.execute(scheduleToUpdate);

    expect(updatedSchedule).toBeDefined();
    expect(updatedSchedule).toBeInstanceOf(Schedule);
    expect(updatedSchedule.id).toBe('test_schedule_id');
    expect(updatedSchedule.serviceId).toBe('updated_service_id');
    expect(updatedSchedule.barberId).toBe('updated_barber_id');

    expect(repositoryMock.update).toHaveBeenCalledTimes(1);
    expect(repositoryMock.getById).toHaveBeenCalledWith(`test_schedule_id`);
  });

  it('should throw ScheduleNotFoundError when try to update a Schedule with non-existent id', async () => {
    repositoryMock.getById.mockResolvedValueOnce(null);

    await expect(useCase.execute('non_existent_id')).rejects.toThrow(
      ScheduleNotFoundError,
    );

    expect(repositoryMock.update).not.toHaveBeenCalled();
  });
});
