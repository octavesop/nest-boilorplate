import { Module } from '@nestjs/common';
import { HealthCheckController } from './controllers/healthcheck.controller';
import { HealthcheckService } from './services/healthcheck.service';

@Module({
  imports: [],
  controllers: [HealthCheckController],
  providers: [HealthcheckService],
})
export class HealthcheckModule {}
