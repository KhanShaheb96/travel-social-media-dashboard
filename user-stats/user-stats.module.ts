import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserStatsService } from './user-stats.service';
import { UserStatsController } from './user-stats.controller';
import { Post } from '../posts/post.entity';
import { SavedDestination } from '../saved-destinations/saved-destination.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, SavedDestination])],
  controllers: [UserStatsController],
  providers: [UserStatsService],
  exports: [UserStatsService], 
})
export class UserStatsModule {}