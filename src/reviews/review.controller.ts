import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { ReviewService } from './review.service';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get(':movieId')
  async searchReviews(@Param('movieId') movieId: string, @Query('keyword') keyword: string) {
    if (!keyword) keyword = "";
    return await this.reviewService.searchReviews(movieId, keyword);
  }

  @Post()
  async createReview(@Body() reviewDto: any) {
    return await this.reviewService.createReview(reviewDto);
  }

  @Put(':id')
  async updateReview(@Param('id') id: string, @Body() reviewDto: any) {
    return await this.reviewService.updateReview(id, reviewDto);
  }

  @Delete(':id')
  async deleteReview(@Param('id') id: string) {
    return await this.reviewService.deleteReview(id);
  }
}
