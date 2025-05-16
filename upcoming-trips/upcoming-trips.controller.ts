import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UpcomingTripsService } from './upcoming-trips.service';

class SaveTripDto {
  destinationId: number;
  userId: number;
}

@Controller('upcoming-trips')
export class UpcomingTripsController {
  constructor(private readonly upcomingTripsService: UpcomingTripsService) {}

  @Get()
  async getUpcomingEvents() {
    return await this.upcomingTripsService.getUpcomingEvents();
  }

  @Post('save')
  async saveTrip(@Body() saveTripDto: SaveTripDto) {
    const { destinationId, userId } = saveTripDto; 
    return await this.upcomingTripsService.saveTrip(destinationId, userId);
  }

  @Get('saved/:userId')
  async getSavedTrips(@Param('userId') userId: string) {
    return await this.upcomingTripsService.getSavedTrips(+userId);
  }
}