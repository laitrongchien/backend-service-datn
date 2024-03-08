import {
  Controller,
  Post,
  Put,
  Body,
  Req,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Request } from 'express';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    return this.userService.uploadImageToCloudinary(file);
  }

  @Put('update-profile')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('avatar'))
  async updateProfile(
    @Req() request: Request,
    @Body() updateProfileData: UpdateProfileDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.userService.updateProfile(
      request.user['sub'],
      updateProfileData,
      file,
    );
  }
}
