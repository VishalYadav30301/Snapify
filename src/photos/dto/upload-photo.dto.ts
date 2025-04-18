import { IsNotEmpty } from 'class-validator';

export class UploadPhotoDto {
  @IsNotEmpty()
  caption: string;
}

