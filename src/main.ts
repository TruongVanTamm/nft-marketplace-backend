import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const allowOrigin = ['http://localhost:3000'];
  const whitelist = [...allowOrigin];
  app.enableCors({
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1 || origin === undefined) {
        // console.log('allowed cors for:', origin);
        callback(null, true);
      } else {
        console.log('Not allowed cors for:', origin);
        callback(new Error(origin + ' not allowed by CORS'));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  await app.listen(4040);
}
bootstrap();
