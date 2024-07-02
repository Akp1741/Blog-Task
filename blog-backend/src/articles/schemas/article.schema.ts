import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import * as mongooseAutoIncrement from 'mongoose-sequence';

export type ArticleDocument = Article & Document;

@Schema()
export class Article {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  slug: string;

  @Prop({ unique: true })
  articleId: number; // Custom primary key field
}

export const ArticleSchema = SchemaFactory.createForClass(Article);

// Initialize the auto-increment plugin
ArticleSchema.plugin(mongooseAutoIncrement(mongoose), { inc_field: 'articleId' });
