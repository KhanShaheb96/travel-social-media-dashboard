import { Module } from '@nestjs/common';
import { TrendingDestinationsService } from './trending-destinations.service';
import { TrendingDestinationsController } from './trending-destinations.controller';

@Module({
  controllers: [TrendingDestinationsController],
  providers: [TrendingDestinationsService],
  exports: [TrendingDestinationsService],
})
export class TrendingDestinationsModule {}