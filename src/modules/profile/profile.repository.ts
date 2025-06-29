import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Profile } from './schemas/profile.schema';
import { Model, ObjectId } from 'mongoose';

@Injectable()
export class ProfileRepository {
    constructor(
        @InjectModel(Profile.name) private readonly Profile: Model<Profile>,
    ) { }

    async updateCustomWithOptions(filter: any, fields: any, options: any = {}) {
        return await this.Profile.updateOne(filter, fields, options)
    }

    async findOneWithCustomFields(filter: any) {
        return await this.Profile.findOne(filter).lean()
    }
}