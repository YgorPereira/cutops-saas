export class Schedule {
  constructor(
    public readonly id: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly serviceId: string,
    public readonly barberId: string,
    public readonly clientId: string,
  ) {}
}
