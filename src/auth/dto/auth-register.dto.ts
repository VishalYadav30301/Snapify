
import { IsString, IsNotEmpty,IsEmail, MinLength, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'John Doe', description: 'User full name' })
  @IsString()
  @IsNotEmpty()
  name: string;
  
  @ApiProperty({ example: 'user@example.com', description: 'User email' })
  @IsEmail()
  @IsNotEmpty()
  email: string;


  @ApiProperty({ example: 'password123', description: 'User password', minLength: 6 })
  @IsNotEmpty()
  @MinLength(6)
  @IsString()
  password: string;

  @ApiProperty({ example: 'admin', description: 'define role ' })
  @IsOptional()
  @IsBoolean()
  isAdmin?: boolean;
  
}
