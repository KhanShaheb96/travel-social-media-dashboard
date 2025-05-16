import { Injectable } from '@nestjs/common';

export interface TrendingDestination {
  name: string;
  popularityScore: number;
}

@Injectable()
export class TrendingDestinationsService {

  private trendingDestinations: TrendingDestination[] = [
    { name: 'Paris', popularityScore: 95 },
    { name: 'Tokyo', popularityScore: 90 },
    { name: 'New York', popularityScore: 85 },
  ];


  getTrendingDestinations = (): TrendingDestination[] => {

    return this.trendingDestinations.map(destination => ({
      ...destination, 
      name: destination.name.toUpperCase(), 
    }));
  };
}