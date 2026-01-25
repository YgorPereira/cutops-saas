import { ScheduleRepository } from 'src/modules/schedule/domain/schedule.repository';
import { DeleteScheduleUseCase } from './delete-schedule.usecase';

describe('DeleteScheduleUseCase', () => {
  let repository: jest.Mocked<ScheduleRepository>;
  let useCase: DeleteScheduleUseCase;

  beforeEach(() => {
    repository = {
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
});
