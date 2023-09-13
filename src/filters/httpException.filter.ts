import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

// 모든 exception을 관리하는 httpFilter
@Catch()
export class HttpGlobalFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    try {
      // Error가 nested하게 들어가 있는 경우를 검사
      const message =
        exception?.getResponse().toString() === '[object Object]'
          ? exception.message
          : exception?.getResponse().toString();

      // Http Status Code가 지정되지 않은 경우 500으로 반환
      const status = exception?.getStatus() ?? HttpStatus.INTERNAL_SERVER_ERROR;

      const responseJson = {
        statusCode: status,
        message: message,
        timestamp: new Date().toISOString(),
        path: request.url,
      };

      // class-validator에 의해 발생한 400 message 처리를 위해 있는 로직
      if (
        exception?.getResponse()?.statusCode === 400 &&
        exception?.getResponse()?.error === 'Bad Request'
      ) {
        // 여러 개가 발생할 수 있으므로 join을 통해 한 문장으로 묶어줌
        responseJson.message = exception?.getResponse().message.join(' / ');
      }

      // 반환
      response.status(status).json(responseJson);
    } catch (error) {
      // 이곳은 httpException이 아닌 Error가 떨어질 때 처리되는 곳으로 무조건 500을 반환.
      // 가능하면 에러를 처리합시다..
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal Server Error',
        timestamp: new Date().toISOString(),
        path: request.url,
      });
    }
  }
}
