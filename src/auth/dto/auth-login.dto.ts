// src/dto/create-user.dto.ts

import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AuthLoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  
  @IsOptional()
  @IsString()
  name: string;                             

  @IsOptional() // Since 'role' has a default value in the model
  @IsString()
  role?: string;
}
