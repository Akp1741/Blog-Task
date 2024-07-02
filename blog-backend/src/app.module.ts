import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticlesModule } from './articles/article.module';
import { appConfig } from 'config/app.config';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/blog'),
    ConfigModule.forRoot(appConfig),
    ArticlesModule,
  ],
})
export class AppModule {   
}
