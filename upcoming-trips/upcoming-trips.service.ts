import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SavedDestination } from '../saved-destinations/saved-destination.entity';


export interface UpcomingEvent {
  name: string;
  id: number;
}

@Injectable()
export class UpcomingTripsService {
  constructor(
    @InjectRepository(SavedDestination)
    private savedDestinationsRepository: Repository<SavedDestination>,
  ) {}


  private upcomingEvents: UpcomingEvent[] = [
    { name: 'Cox’s Bazaar', id: 1 },
    { name: 'Bandarban', id: 2 },
    { name: 'Srimangal', id: 3 },
  ];

  getUpcomingEvents = async (): Promise<UpcomingEvent[]> => {
    return this.upcomingEvents;
  };


  saveTrip = async (destinationId: number, userId: number): Promise<SavedDestination> => {
    const destination = this.upcomingEvents.find(event => event.id === destinationId);
    if (!destination) throw new Error('Destination not found');

    const saved = this.savedDestinationsRepository.create({
      destination: destination.name,
      userId,
    });
    return await this.savedDestinationsRepository.save(saved);
  };

 
  getSavedTrips = async (userId: number): Promise<SavedDestination[]> => {
    return await this.savedDestinationsRepository.find({ where: { userId } });
  };
}