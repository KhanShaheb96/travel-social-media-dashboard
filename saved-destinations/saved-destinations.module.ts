import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SavedDestinationsController } from './saved-destinations.controller';
import { SavedDestinationsService } from './saved-destinations.service';
import { SavedDestination } from './saved-destination.entity';


@Module({
  imports: [TypeOrmModule.forFeature([SavedDestination])],
  controllers: [SavedDestinationsController],
  providers: [SavedDestinationsService],
})
export class SavedDestinationsModule {}