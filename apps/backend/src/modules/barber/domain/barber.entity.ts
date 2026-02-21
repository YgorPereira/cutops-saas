export class Barber {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    public readonly phone: string,
    public readonly createdAt?: Date,
    public readonly updateAt?: Date,
  ) {}

  static createBarber(props: {
    id?: string;
    name: string;
    email: string;
    phone: string;
  }): Barber {
    return new Barber(props.id ?? '', props.name, props.email, props.phone);
  }

  updateBarber(props: {
    id?: string;
    name?: string;
    email?: string;
    phone?: string;
  }): Barber {
    return new Barber(
      props.id ?? this.id,
      props.name ?? this.name,
      props.email ?? this.email,
      props.phone ?? this.phone,
    );
  }

  static restore(props: {
    id: string;
    name: string;
    email: string;
    phone: string;
    createdAt: Date;
    updatedAt: Date;
  }): Barber {
    return new Barber(
      props.id,
      props.name,
      props.email,
      props.phone,
      props.createdAt,
      props.updatedAt,
    );
  }
}
