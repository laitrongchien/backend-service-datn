import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Repair extends Document {
  @Prop()
  startDate: Date;

  @Prop({ required: true, type: String })
  identification: string;

  @Prop({ required: true, enum: ['repair', 'maintainance'] })
  type: string;

  @Prop({ required: true, type: String })
  description: string;

  @Prop()
  cost: number;

  @Prop({ default: 'in progress' })
  status: string;
}

export const RepairSchema = SchemaFactory.createForClass(Repair);
