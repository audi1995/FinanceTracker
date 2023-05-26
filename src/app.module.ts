import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './user/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { IncomeModule } from './income/income.module';
import { Income } from './income/entities/income.entity';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env',
  }),

  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (config: ConfigService) => ({
      type: 'postgres',
      host: config.get('DB_HOST'),
      port: config.get('DB_PORT'),
      username: config.get('DB_USERNAME'),
      password: config.get('DB_PASSWORD'),
      database: config.get('DB_DATABASE'),
      entities:[User, Income],
      synchronize: true,
    })
  }), UserModule, AuthModule, IncomeModule],
  
  controllers: [],
  providers: [],
})
export class AppModule { }
