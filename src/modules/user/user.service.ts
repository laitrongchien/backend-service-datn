import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '../../schemas/user.schema';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private cloudinaryService: CloudinaryService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      id,
      updateUserDto,
      {
        new: true,
      },
    );

    return updatedUser;
  }

  async getByEmail(email: string) {
    const user = await this.userModel.findOne({ email });
    return user;
  }

  async getById(userId: string) {
    return await this.userModel.findById({ _id: userId });
  }

  async uploadImageToCloudinary(file: Express.Multer.File) {
    try {
      return await this.cloudinaryService.uploadImage(
        file,
        'motortour/images/avatar',
      );
    } catch (error) {
      throw new BadRequestException('Invalid file type.');
    }
  }

  async updateProfile(
    userId: string,
    updateProfileData: UpdateProfileDto,
    file: Express.Multer.File,
  ) {
    const updateUser = await this.getById(userId);
    if (updateProfileData.name) updateUser.name = updateProfileData.name;
    if (file) {
      const res = await this.cloudinaryService.uploadImage(
        file,
        'motortour/images/avatar',
      );
      updateUser.avatar = res.secure_url;
    }
    const updatedUser = await updateUser.save();
    return { ...updatedUser.toObject(), password: '' };
  }
}
