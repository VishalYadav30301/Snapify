
import { IsString, IsNotEmpty,IsEmail, MinLength, IsOptional, IsBoolean } from 'class-validator';

export class AuthRegisterDto {
  @IsNotEmpty()
  name: string;
  
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;


  @IsOptional()
  @IsBoolean()
  isAdmin?: boolean;
  
}
