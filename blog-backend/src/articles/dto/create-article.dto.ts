import { ApiProperty } from '@nestjs/swagger';

export class CreateArticleDto {
  @ApiProperty({ example: 'My Article Title' })
  title: string;

  @ApiProperty({ example: 'This is a description of the article.' })
description: string;

  @ApiProperty({ example: 'Food' })
  category: string;

  @ApiProperty({ example: 'my-article-title' })
   slug: string;
}
