import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Movie } from '../movie/movie.schema';

@Schema()
export class Review extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true })
  movieId: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  reviewerName: string;

  @Prop({ required: true })
  rating: number;

  @Prop({ required: true })
  reviewComments: string;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
