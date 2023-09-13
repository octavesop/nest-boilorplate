import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidRequestException extends HttpException {
  constructor() {
    super('올바르지 못한 요청입니다.', HttpStatus.BAD_REQUEST);
  }
}
