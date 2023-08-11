import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { HealthcheckService } from '../services/healthcheck.service';

@ApiTags('헬스체크')
@Controller('/healthcheck')
export class HealthCheckController {
  constructor(private readonly healthcheckService: HealthcheckService) {}

  @ApiOperation({ description: 'ping' })
  @Get()
  ping() {
    return this.healthcheckService.ping();
  }
}
