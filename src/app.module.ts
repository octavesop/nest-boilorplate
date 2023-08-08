import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 타 모듈에서 import하지 않아도 ConfigService 사용 가능
      envFilePath: '.env.example',
    }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService<NodeJS.ProcessEnv>) => ({
        secret: configService.get<string>('AUTH_ACCESS_TOKEN_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('AUTH_ACCESS_TOKEN_EXPIRE'),
        },
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
