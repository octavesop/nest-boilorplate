import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

export class UserQueryrunner {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  private readonly logger = new Logger(UserQueryrunner.name);

  async getUserByName(userName) {
    try {
      const result = await this.userRepository.query(`
SELECT
    user_uid AS "userUid",
    user_id AS "userId",
    user_name AS "userName",
    user_nickname AS "userNickanem",
    user_email AS "userEmail",
    user_profile_image AS "userProfileImage"
FROM "USER"
WHERE user_name = '${userName}'
      `);
      return result[0];
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
