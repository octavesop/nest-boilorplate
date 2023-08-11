import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthcheckService {
  ping(): { status: 'OK' } {
    return { status: 'OK' };
  }
}
