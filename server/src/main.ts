import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import containt from './configs/containt';
import * as dotenv from 'dotenv';
dotenv.config()

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: "*",
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  console.log('rocess.env.APP_PORT', process.env.APP_PORT);
  
  await app.listen(process.env.APP_PORT);
}
bootstrap();
