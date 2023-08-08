import { ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { TokenNotFoundException } from 'src/exceptions/tokenNotFound.exception';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const jwtService = new JwtService({}); // TODO
    try {
      const req = context.switchToHttp().getRequest();
      if (!req.cookies?.['accessToken']) {
        throw new TokenNotFoundException();
      }

      // 이곳에서 accessToken value의 타입 명시
      const response: any = jwtService.decode(req.cookies?.['accessToken']);

      const decodePayload = {
        userId: response.userId,
        userUid: response.userUid,
        iss: response.iss,
        iat: response.iat,
        exp: response.exp,
      };

      console.log(decodePayload);

      return true;
    } catch (error) {
      if (error instanceof TokenNotFoundException) {
        throw error;
      }
    }
  }
}
