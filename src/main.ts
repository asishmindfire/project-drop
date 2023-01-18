import { NestFactory } from '@nestjs/core';
import { RootModule } from './root.module';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(RootModule);
  app.enableCors({
    allowedHeaders: "*",
    origin: "*"
  });
  app.use(helmet());
  app.setGlobalPrefix('api/v1');
  await app.listen(process.env.port);
}
bootstrap();
