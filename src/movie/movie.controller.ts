import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { MovieService } from './movie.service';

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  async searchMovies(@Query('keyword') keyword: string) {
    if (!keyword) keyword = "";
    return await this.movieService.searchMoviesWithReviewsByTitle(keyword);
  }

  @Post()
  async createMovie(@Body() movieDto: any) {
    return await this.movieService.createMovie(movieDto);
  }

  @Put(':id')
  async updateMovie(@Param('id') id: string, @Body() movieDto: any) {
    return await this.movieService.updateMovie(id, movieDto);
  }

  @Delete(':id')
  async deleteMovie(@Param('id') id: string) {
    return await this.movieService.deleteMovie(id);
  }
}
