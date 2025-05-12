import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { SavedDestinationsService } from './saved-destinations.service';
//import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('saved-destinations')
export class SavedDestinationsController {
  constructor(private readonly savedDestinationsService: SavedDestinationsService) {}

  @Get('upcoming')
  async getUpcomingEvents() {
    return await this.savedDestinationsService.getUpcomingEvents();
  }
  
  //@UseGuards(JwtAuthGuard)
  @Post('save')
  async saveDestination(
    @Body('destinationId') destinationId: number,
    @Body('userId') userId: number,
  ) {
    return await this.savedDestinationsService.saveDestination(destinationId, userId);
  }

 // @UseGuards(JwtAuthGuard)
  @Get('saved/:userId')
  async getSavedDestinations(@Param('userId') userId: string) {
    return await this.savedDestinationsService.getSavedDestinations(+userId);
  }
}