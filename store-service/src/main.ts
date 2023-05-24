import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { environments } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable Cross origin resource sharing
  app.enableCors();

  // Set Prefix "api" for all endpoint in system
  app.setGlobalPrefix("api");

  await app.listen(environments.port);
}
bootstrap();
