import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module'; 
import { SavedDestinationsModule } from './saved-destinations/saved-destinations.module';
import { UserStatsModule } from './user-stats/user-stats.module';
import { UpcomingTripsModule} from './upcoming-trips/upcoming-trips.module';
import { TrendingDestinationsModule } from './trending-destinations/trending-destinations.module';
import { User } from './users/users.entity';
import { Post } from './posts/post.entity'; 
import { SavedDestination } from './saved-destinations/saved-destination.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';  
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', 
      port: 5432, 
      username: 'postgres', 
      password: 'khan', 
      database: 'TravelDB',
      entities: [User, Post, SavedDestination], 
      synchronize: true, 
    }),
    UsersModule,PostsModule, SavedDestinationsModule , UserStatsModule, UpcomingTripsModule,TrendingDestinationsModule, PassportModule,
    JwtModule.register({
      global: true,
      secret: 'joldiLoginKoro', 
      signOptions: { expiresIn: '1h' }, 
    }), AuthModule
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
