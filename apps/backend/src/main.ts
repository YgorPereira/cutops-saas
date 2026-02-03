import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ScheduleNotFoundFilter } from './modules/schedule/presentation/filters/schedule-not-found.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new ScheduleNotFoundFilter());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
