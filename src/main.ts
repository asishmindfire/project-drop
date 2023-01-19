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
  const port = process.env.port || 3000;
  await app.listen(port);
}
bootstrap();
