import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Mongoose } from 'mongoose';
import { Review } from './review.schema';

@Injectable()
export class ReviewService {
  constructor(@InjectModel(Review.name) private reviewModel: Model<Review>) {}

  async createReview(reviewDto: any): Promise<Review> {
    return this.reviewModel.create(reviewDto);
  }

  async searchReviews(movieId: string, keyword: string) {
    const reviews = await this.reviewModel.find({
      movieId,
      $or: [
        { reviewerName: { $regex: keyword, $options: 'i' } },
        { reviewComments: { $regex: keyword, $options: 'i' } },
      ],
    });
    
    const avgRating: number = (reviews.length > 0) ? (reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length) : 0;
    
    return { reviews, avgRating };
  }

  async updateReview(id: string, updateDto: any) {
    return this.reviewModel.findByIdAndUpdate(id, updateDto, { new: true });
  }

  async deleteReview(id: string) {
    return this.reviewModel.findByIdAndDelete(id);
  }
}
