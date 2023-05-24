import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

const config = (app: INestApplication) => {
  const options = new DocumentBuilder()
    .setTitle('User Service')
    .setDescription('Manages user')
    .setVersion('1.0')
    .addTag('user')
    .setBasePath('/api')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
}

export default config;