import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Movie } from './movie.schema';
import { Review } from '../reviews/review.schema';

@Injectable()
export class MovieService {
  constructor(
    @InjectModel(Movie.name) private movieModel: Model<Movie>,
    @InjectModel(Review.name) private reviewModel: Model<Review>
  ) {}

  async createMovie(movieDto: any): Promise<Movie> {
    return await this.movieModel.create(movieDto);
  }

  async searchMoviesWithReviewsByTitle(keyword: string) {
    return await this.movieModel.aggregate([
      {
        $match: {
          title: { $regex: keyword, $options: 'i' },
        },
      },
      {
        $lookup: {
          from: 'reviews',
          localField: '_id',
          foreignField: 'movieId',
          as: 'reviews',
        },
      },
      {
        $addFields: {
          avgRating: { $avg: '$reviews.rating' },
        },
      },
    ]);
  }  

  async updateMovie(id: string, updateDto: any) {
    return await this.movieModel.findByIdAndUpdate(id, updateDto, { new: true });
  }

  async deleteMovie(id: string) {
    await this.reviewModel.deleteMany({ movieId: id });
    return await this.movieModel.findByIdAndDelete(id);
  }
}
