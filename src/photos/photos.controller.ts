import { Controller, Post, UseGuards, UseInterceptors, UploadedFile, Body, Request, Get, Param, Delete, Query } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PhotosService } from './photos.service';
import { UploadPhotoDto } from './dto/upload-photo.dto';

@Controller('photos')
@UseGuards(JwtAuthGuard)
export class PhotosController {
  constructor(private readonly photosService: PhotosService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  uploadPhoto(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: UploadPhotoDto,
    @Request() req
  ) {
    return this.photosService.uploadPhoto(file, body.caption, req.user.userId);
  }

  @Get()
  findAll(@Request() req, @Query('page') page: number = 1) {
    return this.photosService.findAllByUser(req.user.userId, page);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.photosService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.photosService.remove(+id, req.user.userId);
  }
}
