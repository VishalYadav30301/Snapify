import { Controller, Post, UseGuards, UseInterceptors, UploadedFile, Body, Request, Get, Param, Delete, Query } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PhotosService } from './photos.service';
import { UploadPhotoDto } from './dto/upload-photo.dto';
import { AuthGuard1 } from '../auth/auth.guard';

@Controller('photos')
@UseGuards(AuthGuard1)
export class PhotosController {
  constructor(private readonly photosService: PhotosService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
   async uploadPhoto(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: UploadPhotoDto,
    @Request() req
  ) {
    return this.photosService.uploadPhoto(file, body.caption, req.userId);
  }

  @Get()
  findAll(@Request() req, @Query('page') page: number = 1) {
    return this.photosService.findAllByUser(req.userId, page);
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
