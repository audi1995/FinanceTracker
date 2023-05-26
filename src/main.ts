import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from './auth/guards/jwt.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const jwtService = app.get<JwtService>(JwtService);
  app.useGlobalGuards(new JwtAuthGuard(jwtService)); 
  await app.listen(3000);
}
bootstrap();
