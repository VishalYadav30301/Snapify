import { Controller, Post, UseGuards, UseInterceptors, UploadedFile, Body, Request, Get, Param, Delete, Query } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PhotosService } from './photos.service';
import { UploadPhotoDto } from './dto/upload-photo.dto';
import { AuthGuard1 } from '../auth/auth.guard';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';





@ApiTags('Photos')
@ApiBearerAuth('JWT-auth')
@Controller('photos')
@UseGuards(AuthGuard1)
export class PhotosController {
  constructor(private readonly photosService: PhotosService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload a photo',
    type: UploadPhotoDto,
  })
  @ApiOperation({ summary: 'Upload a photo' })
  @ApiResponse({ status: 201, description: 'Photo uploaded successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async uploadPhoto(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: UploadPhotoDto,
    @Request() req
  ) {
    return this.photosService.uploadPhoto(file, body.caption, req.userId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all photos for current user' })
  @ApiResponse({ status: 200, description: 'Photos retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findAll(@Request() req, @Query('page') page: number = 1) {
    return this.photosService.findAllByUser(req.userId, page);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific photo' })
  @ApiResponse({ status: 200, description: 'Photo retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Photo not found' })
  async findOne(@Param('id') id: string, @Request() req) {
    return this.photosService.findOne(+id, req.userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a photo' })
  @ApiResponse({ status: 200, description: 'Photo deleted successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Photo not found' })
 async remove(@Param('id') id: string, @Request() req) {
    return this.photosService.remove(+id, req.user.userId);
  }
}
