import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SavedDestination } from '../saved-destinations/saved-destination.entity';

export interface UpcomingEvent {
  name: string; 
}

@Injectable()
export class UpcomingTripsService {
  constructor(
    @InjectRepository(SavedDestination)
    private savedDestinationsRepository: Repository<SavedDestination>,
  ) {}

  private upcomingEvents: UpcomingEvent[] = [
    { name: 'Cox’s Bazaar' },
    { name: 'Bandarban' },
    { name: 'Srimangal' },
  ];

  getUpcomingEvents = async (): Promise<UpcomingEvent[]> => {
    return this.upcomingEvents;
  };

  saveTrip = async (destinationName: string, userId: number): Promise<SavedDestination> => {
    
    const saved = this.savedDestinationsRepository.create({
      destination: destinationName, 
      userId,
    });
    return await this.savedDestinationsRepository.save(saved);
  };

  getSavedTrips = async (userId: number): Promise<SavedDestination[]> => {
    return await this.savedDestinationsRepository.find({ where: { userId } });
  };
}