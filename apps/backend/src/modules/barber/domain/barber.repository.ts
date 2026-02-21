import { Injectable } from '@nestjs/common';
import { Barber } from './barber.entity';

@Injectable()
export abstract class BarberRepository {
  abstract create(barber: Barber): Promise<Barber>;
  abstract listAll(): Promise<Barber[]>;
  abstract getById(id: string): Promise<Barber | null>;
  abstract update(barber: Barber): Promise<Barber>;
  abstract delete(id: string): Promise<void>;
}
