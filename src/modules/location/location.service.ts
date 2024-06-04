import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Location } from '../../schemas/location.schema';
import { MotorIdentification } from '../../schemas/motorIdentification.schema';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';

@Injectable()
export class LocationService {
  constructor(
    @InjectModel(Location.name)
    private readonly locationModel: Model<Location>,
    @InjectModel(MotorIdentification.name)
    private readonly motorIdentificationModel: Model<MotorIdentification>,
  ) {}

  async getAllLocations() {
    const data = await this.locationModel.find();
    const locations = await Promise.all(
      data.map(async (location) => {
        const numOfMotorIdentifications =
          await this.motorIdentificationModel.countDocuments({
            location: location.address,
          });
        return { ...location.toObject(), numOfMotorIdentifications };
      }),
    );
    return locations;
  }

  async createLocation(createLocationDto: CreateLocationDto) {
    const createdLocation = new this.locationModel(createLocationDto);
    return await createdLocation.save();
  }

  async updateLocation(id: string, updateLocationDto: UpdateLocationDto) {
    return await this.locationModel.findByIdAndUpdate(id, updateLocationDto, {
      new: true,
    });
  }

  async deleteLocation(id: string) {
    return await this.locationModel.findByIdAndDelete(id);
  }

  async getLocationById(id: string) {
    return await this.locationModel.findById(id);
  }
}
