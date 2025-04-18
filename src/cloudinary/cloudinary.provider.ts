// src/cloudinary/cloudinary.provider.ts
import { v2 as cloudinary } from 'cloudinary';
import { ConfigService } from '@nestjs/config';

export const  CloudinaryProvider = {
  provide: 'CLOUDINARY',
  isGlobal:true,
  useFactory: (configService: ConfigService) => {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,

    });

    console.log(configService.get<string>('cloud.name'));
    return cloudinary;
  },
  inject: [ConfigService],
};
