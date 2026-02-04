import { ScheduleRepository } from 'src/modules/schedule/domain/schedule.repository';
import { DeleteScheduleUseCase } from './delete-schedule.usecase';
import { ScheduleNotFoundError } from 'src/modules/schedule/domain/errors/schedule-not-found.error';

describe('DeleteScheduleUseCase', () => {
  let repository: jest.Mocked<ScheduleRepository>;
  let useCase: DeleteScheduleUseCase;

  beforeEach(() => {
    repository = {
      getById: jest.fn().mockResolvedValue(true),
      delete: jest.fn().mockResolvedValue(undefined),
    };

    useCase = new DeleteScheduleUseCase(repository);
  });

  it('should delete a schedule sucssefully', async () => {
    const scheduleToDelete = 'teste_id';

    const deletedSchedule = await useCase.execute(scheduleToDelete);

    expect(deletedSchedule).toBeUndefined();

    expect(repository.delete).toHaveBeenCalledWith('teste_id');
    expect(repository.delete).toHaveBeenCalledTimes(1);
  });

  it('should throw ScheduleNotFoundError when try to delete a Schedule with non-existent id', async () => {
    repository.getById.mockResolvedValueOnce(null);

    await expect(useCase.execute('non_existent_id')).rejects.toThrow(
      ScheduleNotFoundError,
    );

    expect(repository.delete).not.toHaveBeenCalled();
  });
});
