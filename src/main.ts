import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import {
  ErrorHandler,
  RequestIdMiddleware,
  SuccessResponseInterceptor,
} from '@common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new ErrorHandler());
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector)),
    new SuccessResponseInterceptor(),
  );
  const config = new DocumentBuilder()
    .setTitle('Api docs')
    .setDescription('The API description')
    .setVersion('0.1')
    // .addBearerAuth()
    .build();

  app.use(RequestIdMiddleware);
  app.enableCors();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
