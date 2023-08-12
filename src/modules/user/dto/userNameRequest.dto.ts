import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserNameRequest {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly userName: string;
}
