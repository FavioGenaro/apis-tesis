import './telemetry'; // Importar antes de NestFactory
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { MetricsInterceptor } from './otel.interceptor';
// import newrelic from 'newrelic';
// import { NewrelicInterceptor } from './newrelic.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api')

  
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );
  
  app.useGlobalInterceptors(new MetricsInterceptor());

  // app.useGlobalInterceptors(new NewrelicInterceptor());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
