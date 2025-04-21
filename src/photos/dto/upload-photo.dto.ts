import { IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';



export class UploadPhotoDto {
  @ApiProperty({
    example: 'My beautiful sunset photo',
    description: 'Caption for the photo',
    required: true,
    type: String
  })

  @IsNotEmpty()
  @MaxLength(500)
  caption: string;
}

