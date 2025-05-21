import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UpcomingTripsService } from './upcoming-trips.service';

class SaveTripDto {
  destinationName: string; // destinationId থেকে destinationName-এ পরিবর্তন
}

@Controller('upcoming-trips')
export class UpcomingTripsController {
  constructor(private readonly upcomingTripsService: UpcomingTripsService) {}

  @Get()
  async getUpcomingEvents() {
    return await this.upcomingTripsService.getUpcomingEvents();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('save')
  async saveTrip(@Body() saveTripDto: SaveTripDto, @Request() req) {
    const userId = req.user.userId;
    const { destinationName } = saveTripDto; // destinationId থেকে destinationName-এ পরিবর্তন
    return await this.upcomingTripsService.saveTrip(destinationName, userId); // destinationId এর বদলে destinationName
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('saved')
  async getSavedTrips(@Request() req) {
    const userId = req.user.userId;
    return await this.upcomingTripsService.getSavedTrips(userId);
  }
}