import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    return NestFactory.create(AppModule);
}
bootstrap();
