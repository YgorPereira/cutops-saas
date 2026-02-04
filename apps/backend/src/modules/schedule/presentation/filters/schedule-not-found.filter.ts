import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { ScheduleNotFoundError } from '../../domain/errors/schedule-not-found.error';
import { Response } from 'express';

@Catch(ScheduleNotFoundError)
export class ScheduleNotFoundFilter implements ExceptionFilter {
  catch(exception: ScheduleNotFoundError, host: ArgumentsHost) {
    const response: Response = host.switchToHttp().getResponse();

    response.status(404).json({
      statusCode: 404,
      message: exception.message,
    });
  }
}
