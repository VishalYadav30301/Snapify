import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PhotosController } from './photos.controller';
import { PhotosService } from './photos.service';
import { Photo } from '../schema/photo.model';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';

@Module({
  imports: [SequelizeModule.forFeature([Photo]), CloudinaryModule],
  controllers: [PhotosController],
  providers: [PhotosService],
})
export class PhotosModule {}
