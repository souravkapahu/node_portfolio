import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Profile } from '../schemas/profile.schema';
import { Model, ObjectId } from 'mongoose';

@Injectable()
export class ProfileAggregationService {
    constructor(@InjectModel(Profile.name) private Profile: Model<Profile>) { }

    async getProfileDetails() {

        return this.Profile.aggregate([

        ]);
    }
}
