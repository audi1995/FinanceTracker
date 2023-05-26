import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { UserService } from 'src/user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LocalStrategy } from './strategys/local.strategy';
import { JwtAuthGuard } from './guards/jwt.guard';
import { JwtStrategy } from './strategys/jwt.strategy';


@Module({
  imports: [ UserModule, JwtModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      global: true,
      secret: configService.get('DB_secret'),
      signOptions: { expiresIn: '1d' },
    })
  }),],
  controllers: [AuthController],
  providers: [LocalStrategy, JwtAuthGuard, JwtStrategy]
})
export class AuthModule {}
