import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user-dto';
import { LoginDto } from '../users/dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<{ access_token: string; user: { id: string; email: string } }> {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
  ): Promise<{ access_token: string; user: { id: string; email: string } }> {
    return this.authService.login(loginDto);
  }
}
