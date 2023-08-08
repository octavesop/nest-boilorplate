import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
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
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard, // 전역 적용의 경우 주석 해제
    // },
    AppService,
  ],
})
export class AppModule {}
