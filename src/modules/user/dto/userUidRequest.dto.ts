import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty } from 'class-validator';

export class UserUidRequest {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  readonly userUid: number;
}
