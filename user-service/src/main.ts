import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { environments, configSwagger } from './config';

const microserviceOptions: MicroserviceOptions = {
  transport: Transport.REDIS,
  options: {
    // url: 'redis://localhost:6379',
    host: 'localhost',
    port: 6379,
    retryAttempts : 5,
    retryDelay : 5000
  },
};

async function bootstrap() {

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    microserviceOptions
  );
  await app.listen();

  // const app = await NestFactory.create(AppModule);

  // // Enable Cross origin resource sharing
  // app.enableCors();

  // // Set Prefix "api" for all endpoint in system
  // app.setGlobalPrefix("api");

  // // Call this function to setup swagger
  // configSwagger(app);

  // await app.listen(environments.port);
}
bootstrap();
