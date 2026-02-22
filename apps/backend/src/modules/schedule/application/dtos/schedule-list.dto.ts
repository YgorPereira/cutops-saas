export class ScheduleListDTO {
  constructor(
    public readonly id: string,
    public readonly serviceId: string,
    public readonly barberName: string,
    public readonly clientId: string,
    public readonly datetime: Date,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date,
  ) {}
}
