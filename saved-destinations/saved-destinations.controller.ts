import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SavedDestinationsService } from './saved-destinations.service';
import { SavedDestination } from './saved-destination.entity';

@Controller('saved-destinations')
export class SavedDestinationsController {
  constructor(private readonly savedDestinationsService: SavedDestinationsService) {}

  @Get('upcoming')
  async getUpcomingEvents(): Promise<any[]> {
    return await this.savedDestinationsService.getUpcomingEvents();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('save')
  async saveDestination(
    @Body('destinationName') destinationName: string, // destinationId থেকে destinationName-এ পরিবর্তন
    @Request() req,
  ): Promise<SavedDestination> {
    const userId = req.user.userId; 
    return await this.savedDestinationsService.saveDestination(destinationName, userId); // destinationId এর বদলে destinationName
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('saved')
  async getMySavedDestinations(@Request() req): Promise<SavedDestination[]> {
    const userId = req.user.userId; 
    return await this.savedDestinationsService.getSavedDestinations(userId);
  }
}