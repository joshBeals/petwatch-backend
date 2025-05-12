import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(userData: Partial<User>): Promise<{ access_token: string; user: { id: number; email: string } }> {
    const hashedPassword = await bcrypt.hash(userData.password!, 10);
    const user = await this.usersService.createUser({
      ...userData,
      password: hashedPassword,
    });
    return this._buildToken(user);
  }

  async login(credentials: { email: string; password: string }): Promise<{ access_token: string; user: { id: number; email: string } }> {
    const user = await this.usersService.findByEmail(credentials.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordMatch = await bcrypt.compare(credentials.password, user.password);
    if (!isPasswordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this._buildToken(user);
  }

  private _buildToken(user: User): { access_token: string; user: { id: number; email: string } } {
    const payload = { sub: user.id, email: user.email };
    const token = this.jwtService.sign(payload);
    return {
      access_token: token,
      user: {
        id: user.id,
        email: user.email,
      },
    };
  }

  async validateUser(userId: number): Promise<User | null> {
    return this.usersService.findById(userId);
  }
}
