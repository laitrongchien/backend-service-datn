import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Exclude } from 'class-transformer';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  @Exclude()
  password: string;

  @Prop({ default: 'user' })
  role: string;

  @Prop({ default: 'register' })
  type: string;

  @Prop({
    default:
      'https://res.cloudinary.com/dufuwsrue/image/upload/v1716134461/motortour/images/avatar/download_tfhmc6.jpg',
  })
  avatar: string;

  @Prop()
  refresh_token: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
