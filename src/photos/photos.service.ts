import { Injectable, NotFoundException, UnauthorizedException, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { v2 } from 'cloudinary';
import type { UploadApiResponse } from 'cloudinary';
import { Photo } from 'src/schema/photo.model';
import { Readable } from 'stream';

// 👇 Correctly infer the type from the actual v2 instance
type CloudinaryType = ReturnType<typeof v2.config> & typeof v2;

@Injectable()
export class PhotosService {
  constructor(
    @InjectModel(Photo) private readonly photoModel: typeof Photo, // Inject the Photo model
    @Inject('CLOUDINARY') private cloudinary: CloudinaryType, // Inject the Cloudinary instance
  ) {}

  private photos: any[] = [];
  private idCounter = 1;

  async uploadPhoto(file: Express.Multer.File, caption: string, userId: string): Promise<any> {
    const result = await this.uploadToCloudinary(file);
    const photo = {
      id: this.idCounter++,
      url: result.secure_url,
      caption,
      userId,
      public_id: result.public_id,
    };
    this.photos.push(photo);
    const savedPhoto = await this.photoModel.create({
      caption,               
      filename: file.originalname,
      url: result.secure_url, 
      size: file.size,        
      createdAt: new Date(), 
      updatedAt: new Date(),  
      userId,               
    });
    return savedPhoto;
  }

  async findAllByUser(userId: number, page: number) {
    const limit = 10; // Number of photos per page
    const offset = (page - 1) * limit;
      return await this.photoModel.findAll({
      where: { userId },
      limit,
      offset,
      order: [['createdAt', 'DESC']],
    });
  }

  async findOne(id: number, userId: number): Promise<any> {
    const photo = await this.photoModel.findOne({
      where: { id, userId }, // Ensure the photo belongs to the logged-in user
    });
  
    if (!photo) {
      throw new Error('Photo not found or you do not have access to it');
    }
  
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

  async uploadToCloudinary(file: Express.Multer.File): Promise<UploadApiResponse> {
    // return new Promise((resolve, reject) => {
    //   const uploadStream = this.cloudinary.uploader.upload_stream(
    //     { resource_type: 'image' },
    //     (error, result) => {
    //       if (error) return reject(error);
    //       resolve(result as UploadApiResponse);
    //     }
    //   );
    //   const readable = new Readable();
    //   readable.push(fileBuffer);
    //   readable.push(null);
    //   readable.pipe(uploadStream);
    // });

    return await v2.uploader.upload(file.path, {
      folder: 'snapify',
      resource_type: 'image',
    });
  }
}
