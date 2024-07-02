export class CONSTANT {
    static readonly MAIN_CONSTANT = {
        STATIC_FOLDER: 'public',
        OPEN_API_PATH: 'api',
        GLOB_PREFIX: 'api',
    };

    static readonly APP_CONFIG_CONSTANT = {
        GLOBAL: true,
        ENV_FILE_PATH: '.env',
    };

    static readonly SWAGGER_CONFIG_CONSTANT = {
        TITLE: 'Blog',
        DESCRIPTION: 'blog project API',
        VERSION: '1.0',
        TAGS_SORTER: 'alpha',
        DOC_EXPANSION: 'none',
    };
   
}
export const TOKEN_EXPIRATION_MINUTES = 15;
