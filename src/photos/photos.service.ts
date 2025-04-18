import { Injectable, NotFoundException, UnauthorizedException, Inject } from '@nestjs/common';
import { v2 } from 'cloudinary';
import type { UploadApiResponse } from 'cloudinary';
import { Readable } from 'stream';

// 👇 Correctly infer the type from the actual v2 instance
type CloudinaryType = ReturnType<typeof v2.config> & typeof v2;

@Injectable()
export class PhotosService {
  constructor(@Inject('CLOUDINARY') private cloudinary: CloudinaryType) {}

  private photos: any[] = [];
  private idCounter = 1;

  async uploadPhoto(file: Express.Multer.File, caption: string, userId: string): Promise<any> {
    const result = await this.uploadToCloudinary(file.buffer);
    const photo = {
      id: this.idCounter++,
      url: result.secure_url,
      caption,
      userId,
      public_id: result.public_id,
    };
    this.photos.push(photo);
    return photo;
  }

  async findAllByUser(userId: string, page: number): Promise<any[]> {
    const pageSize = 10;
    return this.photos.filter(p => p.userId === userId).slice((page - 1) * pageSize, page * pageSize);
  }

  async findOne(id: number): Promise<any> {
    const photo = this.photos.find(p => p.id === id);
    if (!photo) throw new NotFoundException('Photo not found');
    return photo;
  }

  async remove(id: number, userId: string): Promise<any> {
    const photoIndex = this.photos.findIndex(p => p.id === id);
    if (photoIndex === -1) throw new NotFoundException('Photo not found');

    const photo = this.photos[photoIndex];
    if (photo.userId !== userId) throw new UnauthorizedException('Not your photo');

    await this.cloudinary.uploader.destroy(photo.public_id);
    this.photos.splice(photoIndex, 1);
    return { message: 'Photo deleted successfully' };
  }

  private uploadToCloudinary(fileBuffer: Buffer): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const uploadStream = this.cloudinary.uploader.upload_stream(
        { resource_type: 'image' },
        (error, result) => {
          if (error) return reject(error);
          resolve(result as UploadApiResponse);
        }
      );
      const readable = new Readable();
      readable.push(fileBuffer);
      readable.push(null);
      readable.pipe(uploadStream);
    });
  }
}
