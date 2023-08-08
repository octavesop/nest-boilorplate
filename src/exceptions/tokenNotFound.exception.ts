import { HttpException, HttpStatus } from '@nestjs/common';

export class TokenNotFoundException extends HttpException {
  constructor() {
    super('토큰이 존재하지 않습니다.', HttpStatus.UNAUTHORIZED);
  }
}
