import { ApiProperty } from '@nestjs/swagger';

export class ListArticleDto {
  @ApiProperty({ example: 'My Article Title' })
  title: string;

  @ApiProperty({ example: 'This is a description of the article.' })
description: string;

@ApiProperty({ required: false })
from_date?: Date;

  @ApiProperty({ required: false })
  to_date?: Date;
}
