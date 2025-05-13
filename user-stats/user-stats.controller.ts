import { Controller, Get, Param, BadRequestException } from '@nestjs/common';
import { UserStatsService } from './user-stats.service';
import { UserStats } from './user-stats.service';

@Controller('user-stats')
export class UserStatsController {
  constructor(private readonly userStatsService: UserStatsService) {}

  @Get(':userId')
  async getUserStats(@Param('userId') userId: string): Promise<UserStats> {
    const parsedUserId = parseInt(userId, 10);
    if (isNaN(parsedUserId)) {
      throw new BadRequestException('Invalid userId: must be a number');
    }

    return await this.userStatsService.getUserStats(parsedUserId);
  }
}