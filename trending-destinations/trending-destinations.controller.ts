import { Controller, Get } from '@nestjs/common';
import { TrendingDestinationsService } from './trending-destinations.service';

@Controller('trending-destinations')
export class TrendingDestinationsController {
  constructor(private readonly trendingDestinationsService: TrendingDestinationsService) {}

  @Get()
  getTrendingDestinations() {
    return this.trendingDestinationsService.getTrendingDestinations();
  }
}