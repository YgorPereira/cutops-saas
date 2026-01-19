import { IsNotEmpty } from 'class-validator';

export class ScheduleCreateDto {
  @IsNotEmpty()
  clientId: string;

  @IsNotEmpty()
  barberId: string;

  @IsNotEmpty()
  serviceId: string;

  @IsNotEmpty()
  datetime: Date;
}
