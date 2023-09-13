import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserNotFoundException } from 'src/exceptions/UserNotFound.exception';
import { Equal, Repository } from 'typeorm';
import { AddUserRequest } from '../dto/addUserRequest.dto';
import { User } from '../entities/user.entity';
import { UserQueryrunner } from '../repositories/user.queryrunner';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly userQueryrunner: UserQueryrunner,
  ) {}
  private readonly logger = new Logger(UserService.name);

  async getUserList() {
    try {
      return await this.userRepository.find();
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async getUserByUid(userUid: number) {
    try {
      const userInfo = await this.userRepository.findOne({
        where: {
          userUid: Equal(userUid),
        },
      });
      if (!userInfo) {
        throw new UserNotFoundException();
      }
      return userInfo;
    } catch (error) {
      this.logger.error(error);
      if (error instanceof UserNotFoundException) {
        throw error;
      }
    }
  }

  async getUserByName(userName: string) {
    try {
      const userInfo = await this.userQueryrunner.getUserByName(userName);
      if (!userInfo) {
        throw new UserNotFoundException();
      }
      return userInfo;
    } catch (error) {
      this.logger.error(error);
      if (error instanceof UserNotFoundException) {
        throw error;
      }
    }
  }

  // TODO
  // not recommended, use response dto instead
  async addUser(request: AddUserRequest): Promise<User> {
    try {
      return await this.userRepository.save(request);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async deleteUser(userUid: number): Promise<void> {
    try {
      const deletedUser = await this.userRepository.delete(userUid);
      if (deletedUser.affected == 0) {
        throw new UserNotFoundException();
      }
    } catch (error) {
      this.logger.error(error);
      if (error instanceof UserNotFoundException) {
        throw error;
      }
    }
  }
}
