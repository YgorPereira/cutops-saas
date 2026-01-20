export class Schedule {
  constructor(
    public readonly id: string,
    public readonly serviceId: string,
    public readonly barberId: string,
    public readonly clientId: string,
    public readonly datetime: Date,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date,
  ) {}

  static createSchedule(props: {
    serviceId: string;
    barberId: string;
    clientId: string;
    datetime: Date;
  }): Schedule {
    return new Schedule(
      '',
      props.serviceId,
      props.barberId,
      props.clientId,
      props.datetime,
    );
  }

  updateSchedule(props: {
    serviceId?: string;
    barberId?: string;
    clientId?: string;
    datetime?: Date;
  }): Schedule {
    return new Schedule(
      this.id,
      props.serviceId ?? this.serviceId,
      props.barberId ?? this.barberId,
      props.clientId ?? this.clientId,
      props.datetime ?? this.datetime,
      this.createdAt,
    );
  }

  static restore(props: {
    id: string;
    serviceId: string;
    barberId: string;
    clientId: string;
    datetime: Date;
    createdAt: Date;
    updatedAt: Date;
  }): Schedule {
    return new Schedule(
      props.id,
      props.serviceId,
      props.barberId,
      props.clientId,
      props.datetime,
      props.createdAt,
      props.updatedAt,
    );
  }
}
