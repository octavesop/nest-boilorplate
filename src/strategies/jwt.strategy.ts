import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);

  constructor(
    // 사용자 검증을 위해 일반적으로 findById 로직 등을 사용
    // private readonly userService: UserService,
    protected readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.accessToken;
          // header 등에서 가져올 경우 로직 변경
        },
      ]),
      ignoreExpiration: true,
      secretOrKey: configService.get('JWT_ACCESS_SECRET'),
    });
  }

  // 이곳에 payload의 타입 지정
  async validate(payload: any): Promise<any> {
    try {
      payload;
      // const result = await this.userService.findUserById(payload.userUid);
      // return result;
    } catch (error) {
      this.logger.error(error);
      throw new Error('Authentication is Invalid.');
    }
  }
}
