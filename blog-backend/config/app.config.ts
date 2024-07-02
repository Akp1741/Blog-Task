/* eslint-disable prettier/prettier */
import { ConfigModuleOptions } from '@nestjs/config';
import { CONSTANT } from './constant.config';

const APP_CONFIG = CONSTANT.APP_CONFIG_CONSTANT;

export const appConfig: ConfigModuleOptions = {
    isGlobal: APP_CONFIG.GLOBAL,
    envFilePath: APP_CONFIG.ENV_FILE_PATH,
};
