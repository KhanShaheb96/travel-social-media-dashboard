import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SavedDestinationsController } from './saved-destinations.controller';
import { SavedDestinationsService } from './saved-destinations.service';
import { SavedDestination } from './saved-destination.entity';
import { AuthModule } from '../auth/auth.module'; 

@Module({
  imports: [TypeOrmModule.forFeature([SavedDestination]), forwardRef(() => AuthModule)],
  controllers: [SavedDestinationsController],
  providers: [SavedDestinationsService],
})
export class SavedDestinationsModule {}