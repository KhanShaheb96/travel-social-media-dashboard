import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SavedDestination } from './saved-destination.entity';

@Injectable()
export class SavedDestinationsService {
  constructor(
    @InjectRepository(SavedDestination)
    private savedDestinationsRepository: Repository<SavedDestination>,
  ) {}

  private upcomingEvents = [
    { name: 'Cox’s Bazaar' }, 
    { name: 'Bandarban' },
    { name: 'Srimangal' },
  ];

  async getUpcomingEvents(): Promise<any[]> {
    return this.upcomingEvents;
  }

  async saveDestination(destinationName: string, userId: number): Promise<SavedDestination> {

    const saved = this.savedDestinationsRepository.create({
      destination: destinationName, 
      userId,
    });
    return await this.savedDestinationsRepository.save(saved);
  }

  async getSavedDestinations(userId: number): Promise<SavedDestination[]> {
    return await this.savedDestinationsRepository.find({ where: { userId } });
  }
}