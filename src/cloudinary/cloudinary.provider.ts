// src/cloudinary/cloudinary.provider.ts
import { v2 as cloudinary } from 'cloudinary';
import { ConfigService } from '@nestjs/config';

export const CloudinaryProvider = {
  provide: 'CLOUDINARY',
  useFactory: (configService: ConfigService) => {
    cloudinary.config({
      cloud_name: configService.get<string>('Snapify'),
      api_key: configService.get<string>('823411297919392'),
      api_secret: configService.get<string>('l9vl6L4yNLclxzQQRK9HuoD9k_o'),
    });
    return cloudinary;
  },
  inject: [ConfigService],
};
