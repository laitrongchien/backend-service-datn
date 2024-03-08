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
import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
);

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
      // console.log(error);
      if (error?.code == 11000) {
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
    const findUser = await this.userService.getById(_user._id);
    return this.loginUser(findUser);
  }

  async logout(userId: string) {
    // const user = await this.userService.getById(userId);
    await this.userService.update(userId, {
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
      role: user.role,
    };

    const access_token = this.generateAccessToken(payload);
    const refresh_token = this.generateRefreshToken(payload);
    await this.userService.update(user._id, {
      refresh_token,
    });
    return { ...user.toObject(), password: '', access_token, refresh_token };
  }

  async googleLogin(token: string) {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const { email, name, picture } = payload;
    const password = email + `${process.env.GOOGLE_STRING}`;
    const passwordHash = await bcrypt.hash(password, 12);

    const user = await this.userService.getByEmail(email);

    if (user) return this.loginUser(user);
    else {
      const createdUser = await this.userService.create({
        name,
        email,
        avatar: picture,
        type: 'google',
        password: passwordHash,
      });
      const payload = {
        username: email,
        sub: createdUser._id,
        role: 'user',
      };
      const access_token = this.generateAccessToken(payload);
      const refresh_token = this.generateRefreshToken(payload);
      await this.userService.update(createdUser._id, {
        refresh_token,
      });
      return { ...createdUser, password: '', access_token, refresh_token };
    }
  }

  async loginUser(user: any) {
    const payload = {
      username: user.email,
      sub: user._id,
      role: user.role,
    };
    const access_token = this.generateAccessToken(payload);
    const refresh_token = this.generateRefreshToken(payload);
    await this.userService.update(user._id, {
      refresh_token,
    });
    return { ...user._doc, password: '', access_token, refresh_token };
  }

  generateAccessToken(payload: object) {
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      expiresIn: '21600s',
    });
  }

  generateRefreshToken(payload: object) {
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_TOKEN_SECRET,
      expiresIn: '30d',
    });
  }
}
