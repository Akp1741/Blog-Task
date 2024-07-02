import { DocumentBuilder } from '@nestjs/swagger';
import { CONSTANT } from './constant.config';

const SWAGGER_CONFIG_CONSTANT = CONSTANT.SWAGGER_CONFIG_CONSTANT;

export const swaggerConfig = new DocumentBuilder()
    .setTitle(SWAGGER_CONFIG_CONSTANT.TITLE)
    .setDescription(SWAGGER_CONFIG_CONSTANT.DESCRIPTION)
    .setVersion(SWAGGER_CONFIG_CONSTANT.VERSION)
    .addBearerAuth()
    .build();

export const swaggerOptions = {
    swaggerOptions: {
        tagsSorter: SWAGGER_CONFIG_CONSTANT.TAGS_SORTER,
        docExpansion: SWAGGER_CONFIG_CONSTANT.DOC_EXPANSION,
    },
};
