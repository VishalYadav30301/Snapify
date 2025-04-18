import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { Photo } from '../schema/photo.model';
import { User } from '../schema/user.model';

@Module({
  imports: [SequelizeModule.forFeature([Photo, User])],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}