import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 타 모듈에서 import하지 않아도 ConfigService 사용 가능
      envFilePath: '.env.example',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
