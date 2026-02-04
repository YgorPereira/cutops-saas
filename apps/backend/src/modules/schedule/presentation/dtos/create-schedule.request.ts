import { IsDateString, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateScheduleRequest {
  @IsUUID()
  @IsNotEmpty()
  serviceId: string;

  @IsUUID()
  @IsNotEmpty()
  barberId: string;

  @IsUUID()
  @IsNotEmpty()
  clientId: string;

  @IsDateString()
  @IsNotEmpty()
  datetime: string;
}
