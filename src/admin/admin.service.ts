import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Photo } from '../schema/photo.model';
import { User } from '../schema/user.model';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Photo) private photoModel: typeof Photo,
    @InjectModel(User) private userModel: typeof User,
    private sequelize: Sequelize,
  ) {}

  async getStats() {
    const totalUploads = await this.photoModel.count();

    const [mostActiveUploader] = await this.photoModel.findAll({
      attributes: ['userId', [this.sequelize.fn('COUNT', 'userId'), 'uploadCount']],
      group: ['userId'],
      order: [[this.sequelize.literal('uploadCount'), 'DESC']],
      limit: 1,
      include: [User],
    });

    const largestPhoto = await this.photoModel.findOne({
      order: [['size', 'DESC']],
    });

    return {
      totalUploads,
      mostActiveUploader: mostActiveUploader?.user || null,
      largestPhoto,
    };
  }
}
