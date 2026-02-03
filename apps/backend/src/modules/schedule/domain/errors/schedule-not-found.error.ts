export class ScheduleNotFoundError extends Error {
  constructor() {
    super(`Schedule not found.`);
    this.name = 'ScheduleNotFoundError';
  }
}
