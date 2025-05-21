import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserStatsService } from './user-stats.service';
import { UserStats } from './user-stats.service';

@Controller('user-stats')
export class UserStatsController {
  constructor(private readonly userStatsService: UserStatsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getMyStats(@Request() req): Promise<UserStats> {
    const userId = req.user.userId;
    return await this.userStatsService.getUserStats(userId);
  }
}