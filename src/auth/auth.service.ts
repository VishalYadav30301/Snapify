import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../schema/user.model';
import * as bcrypt from 'bcrypt';
import {  RegisterDto } from './dto/auth-register.dto';
import { LoginDto } from './dto/auth-login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { name, email, password } = registerDto;
    // Check if user already exists
    const existingUser = await this.userModel.findOne({ where: { email } });
    if (existingUser) {
      throw new UnauthorizedException('User already exists');
    }
    const hashed = await bcrypt.hash(password, 10);
    const user = await this.userModel.create({
      name: name,
      email: email,
      password: hashed,
      role: 'user', // Default role
    } as any);
    return { message: 'User registered successfully' };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.userModel.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.getToken(user);
  }

  getToken(user: User) {
    console.log(user.role);
    const payload = { sub: user.id, email: user.email, role: user.role };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  async getProfile(userId: number) {
    const user = await this.userModel.findByPk(userId, {
      attributes: ['id', 'name', 'email', 'role'],
    });
    // Check if user exists
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
}
