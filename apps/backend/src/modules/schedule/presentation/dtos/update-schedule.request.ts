import { IsNotEmpty, IsUUID, IsDateString } from 'class-validator';

export class UpdateScheduleRequest {
  @IsUUID()
  serviceId: string;

  @IsUUID()
  barberId: string;

  @IsUUID()
  clientId: string;

  @IsDateString()
  @IsNotEmpty()
  datetime: string;
}
