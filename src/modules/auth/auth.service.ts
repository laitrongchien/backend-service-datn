import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import RegisterDto from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.getByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async register(registrationData: RegisterDto) {
    const hashedPassword = await bcrypt.hash(registrationData.password, 10);
    try {
      return await this.userService.create({
        ...registrationData,
        password: hashedPassword,
      });
    } catch (error) {
      if (error?.code == 11000) {
        console.log(error);
        throw new HttpException(
          'User with that email already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async login(user: any) {
    const _user = user._doc;
    const payload = {
      username: _user.email,
      sub: _user._id,
      role: _user.role,
    };
    const access_token = this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      expiresIn: '86400s',
    });
    const refresh_token = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_TOKEN_SECRET,
      expiresIn: '30d',
    });
    await this.userService.update(_user._id, {
      ..._user,
      refresh_token,
    });
    return { access_token, refresh_token };
  }

  async logout(userId: string) {
    const user = await this.userService.getById(userId);
    await this.userService.update(userId, {
      ...user.toObject(),
      refresh_token: '',
    });
  }

  async refreshToken(userId: string, refreshToken: string) {
    const user = await this.userService.getById(userId);
    if (!user || !user.refresh_token)
      throw new ForbiddenException('Access Denied');
    if (refreshToken !== user.refresh_token)
      throw new ForbiddenException('Access Denied');
    const payload = {
      username: user.email,
      sub: user._id,
    };

    const access_token = this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      expiresIn: '86400s',
    });
    const refresh_token = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_TOKEN_SECRET,
      expiresIn: '30d',
    });
    await this.userService.update(user._id, {
      ...user.toObject(),
      refresh_token,
    });
    return { access_token, refresh_token };
  }

  googleLogin(req) {
    if (!req.user) {
      return 'No user from google';
    }

    return {
      message: 'User information from google',
      user: req.user,
    };
  }
}
