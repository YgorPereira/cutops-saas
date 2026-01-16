abstract class ScheduleRepository {
  abstract createSchedule(scheduleData: any): Promise<any>;
  abstract listSchedules(filter?: any): Promise<any[]>;
  abstract getScheduleById(scheduleId: string): Promise<any>;
  abstract updateSchedule(scheduleId: string, updateData: any): Promise<any>;
  abstract deleteSchedule(scheduleId: string): Promise<void>;
}

export { ScheduleRepository };
