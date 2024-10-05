import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  app.use(express.static("."))
  app.useGlobalPipes(new ValidationPipe())

  const config = new DocumentBuilder().setTitle("Airbnb ThanhNodejs").addBearerAuth().setVersion("1.0.0").setDescription("Đây là mô tả Sagger").build()
  const document = SwaggerModule.createDocument(app,config)
  SwaggerModule.setup("/swagger",app,document)

  await app.listen(8080);
}
bootstrap();
