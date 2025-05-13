import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UpcomingTripsService } from './upcoming-trips.service';
import { UpcomingTripsController } from './upcoming-trips.controller';
import { SavedDestination } from '../saved-destinations/saved-destination.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SavedDestination])],
  controllers: [UpcomingTripsController],
  providers: [UpcomingTripsService],
  exports: [UpcomingTripsService],
})
export class UpcomingTripsModule {}