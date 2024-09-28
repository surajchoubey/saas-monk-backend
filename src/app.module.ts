import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Movie, MovieSchema } from './movie/movie.schema';
import { MovieService } from './movie/movie.service';
import { MovieController } from './movie/movie.controller';
import { Review, ReviewSchema } from './reviews/review.schema';
import { ReviewService } from './reviews/review.service';
import { ReviewController } from './reviews/review.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI),
    MongooseModule.forFeature([
      { name: Movie.name, schema: MovieSchema },
      { name: Review.name, schema: ReviewSchema },
    ]),
  ],
  controllers: [MovieController, ReviewController],
  providers: [MovieService, ReviewService],
})
export class AppModule {}