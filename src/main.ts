import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*', // Allows all origins
    methods: 'GET,POST,PUT,DELETE', // Allowed methods
    allowedHeaders: 'Content-Type, Authorization', // Allowed headers
  });
  
  await app.listen(5001);
}
bootstrap();
