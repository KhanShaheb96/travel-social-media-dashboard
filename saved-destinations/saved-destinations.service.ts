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
    { name: 'Cox’s Bazaar', id: 1 },
    { name: 'Bandarban', id: 2 },
    { name: 'Srimangal', id: 3 },
  ];

  async getUpcomingEvents() {
    return this.upcomingEvents;
  }

  async saveDestination(destinationId: number, userId: number) {
    const destination = this.upcomingEvents.find(event => event.id === destinationId);
    if (!destination) throw new Error('Destination not found');
    const saved = this.savedDestinationsRepository.create({
      destination: destination.name,
      userId,
    });
    return await this.savedDestinationsRepository.save(saved);
  }

  async getSavedDestinations(userId: number) {
    return await this.savedDestinationsRepository.find({ where: { userId } });
  }
}