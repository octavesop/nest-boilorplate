import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class AddUserRequest {
  @ApiProperty()
  @IsString()
  readonly userId: string;

  @ApiProperty()
  @IsString()
  @MinLength(8)
  @MaxLength(16)
  readonly userPw: string;

  @ApiProperty()
  @IsString()
  readonly userName: string;

  @ApiProperty()
  @IsString()
  @IsEmail()
  readonly userEmail: string;

  @ApiProperty()
  @IsBoolean()
  readonly agreeEssentialTerm: boolean;

  @ApiProperty()
  @IsBoolean()
  readonly agreeMarketingSend: boolean;
}
