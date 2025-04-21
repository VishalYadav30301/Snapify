import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Photo } from '../schema/photo.model';
import { User } from '../schema/user.model';
import { Sequelize } from 'sequelize-typescript';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService implements OnModuleInit {
  constructor(
    @InjectModel(Photo) private photoModel: typeof Photo,
    @InjectModel(User) private userModel: typeof User,
    private sequelize: Sequelize,
  ) {}

  // Seed a default admin when the application starts
  async onModuleInit() {
    await this.seedDefaultAdmin();
  }

  async seedDefaultAdmin() {
    const existingAdmin = await this.userModel.findOne({ where: { role: 'admin' } });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('defaultAdminPassword', 10);
      await this.userModel.create({
        name: 'Admin',
        email: 'admin@example.com',
        password: hashedPassword,
        role: 'admin',
      } as any);
      console.log(`Default admin user created: Admin`);
    } else {
      console.log('Admin user already exists. Skipping default admin creation.');
    }
  }

  // Fetch statistics for the admin
  async getStats() {
    const totalUploads = await this.photoModel.count();
    // Count the total number of uploads  
    const [mostActiveUploader] = await this.photoModel.findAll({
      attributes: [
        'userId',
        [this.sequelize.fn('COUNT', this.sequelize.col('userId')), 'uploadCount'],
      ],
      group: ['userId', 'user.id', 'user.name', 'user.email', 'user.role'], // Add all included columns
      order: [[this.sequelize.col('uploadCount'), 'DESC']],
      limit: 1,
      include: [{
        model: User,
        attributes: ['id', 'name', 'email', 'role'],
      }],
    });
  
    const largestPhoto = await this.photoModel.findOne({
      order: [['size', 'DESC']], // Find the largest photo by size
    });
  
    return {
      totalUploads,
      mostActiveUploader: mostActiveUploader, // Return user details or null
      largestPhoto,
    };
  } 
}