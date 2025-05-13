import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../posts/post.entity';
import { SavedDestination } from '../saved-destinations/saved-destination.entity';

export interface UserStats {
  userId: number;
  postCount: number;
  savedDestinationsCount: number;
}

@Injectable()
export class UserStatsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
    @InjectRepository(SavedDestination)
    private savedDestinationsRepository: Repository<SavedDestination>,
  ) {}

  getUserStats = async (userId: number): Promise<UserStats> => {
    try {
      const postCount = await this.postsRepository.count({ where: { userId } });
      const savedDestinationsCount = await this.savedDestinationsRepository.count({
        where: { userId },
      });

      console.log(`Stats for user ${userId}: ${postCount} posts, ${savedDestinationsCount} saved destinations`);

      return { userId, postCount, savedDestinationsCount };
    } catch (error) {
      // Log the error for debugging
      console.error(`Error fetching stats for user ${userId}:`, error.message);
      // Return a default response to avoid crashing
      return { userId, postCount: 0, savedDestinationsCount: 0 };
    }
  };
}