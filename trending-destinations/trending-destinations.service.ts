import { Injectable } from '@nestjs/common';

// TypeScript: Interface for trending destinations
export interface TrendingDestination {
  name: string;
  popularityScore: number;
}

@Injectable()
export class TrendingDestinationsService {
  // ES6: Array of objects
  private trendingDestinations: TrendingDestination[] = [
    { name: 'Paris', popularityScore: 95 },
    { name: 'Tokyo', popularityScore: 90 },
    { name: 'New York', popularityScore: 85 },
  ];

  // ES6: Arrow function
  getTrendingDestinations = (): TrendingDestination[] => {
    // ES6: Array method (map)
    return this.trendingDestinations.map(destination => ({
      ...destination, // ES6: Spread operator
      name: destination.name.toUpperCase(), // ES6: String method
    }));
  };
}