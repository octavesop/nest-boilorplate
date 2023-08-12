import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AddUserRequest } from '../dto/addUserRequest.dto';
import { UserNameRequest } from '../dto/userNameRequest.dto';
import { UserUidRequest } from '../dto/userUidRequest.dto';
import { User } from '../entities/user.entity';
import { UserService } from '../services/user.service';

@ApiTags('사용자(프로토타입)')
@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ description: '사용자 리스트를 가져옵니다.' })
  @Get('/')
  async getUserList() {
    return await this.userService.getUserList();
  }

  @ApiOperation({ description: '사용자 uid를 기준으로 정보를 가져옵니다.' })
  @Get('/:userUid')
  async getUserByUid(@Param() params: UserUidRequest) {
    return await this.userService.getUserByUid(params.userUid);
  }

  @ApiOperation({ description: '사용자 이름을 기준으로 정보를 가져옵니다.' })
  @Get('/name/:userName')
  async getUserByName(@Param() params: UserNameRequest) {
    return await this.userService.getUserByName(params.userName);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('/')
  async addUser(@Body() request: AddUserRequest): Promise<User> {
    return await this.userService.addUser(request);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:userUid')
  async deleteUser(@Param() params: UserUidRequest): Promise<void> {
    return await this.userService.deleteUser(params.userUid);
  }
}
