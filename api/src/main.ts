import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as admin from 'firebase-admin'


async function bootstrap() {

  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: "https://async-press.firebaseio.com"
  });

  const app = await NestFactory.create(AppModule);
  app.enableCors( {origin: 'http://localhost:3001'})
  await app.listen(3000);
}
bootstrap();
