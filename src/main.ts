import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as fs from 'fs';

async function bootstrap() {
  if (process.env.DEBUG === 'true') {
    const app = await NestFactory.create(AppModule);
    app.use(cookieParser());
    app.enableCors({
      origin: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      credentials: true,
    });

    await app.listen(5010);
  } else {
    const httpsOptions = {
      key: fs.readFileSync('/etc/ssl/privkey.pem'),
      cert: fs.readFileSync('/etc/ssl/fullchain.pem'),
    };

    const app = await NestFactory.create(AppModule, {httpsOptions});
    app.use(cookieParser());
    app.enableCors({
      origin: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      credentials: true,
    });

    await app.listen(5010);
  }
}
bootstrap();
