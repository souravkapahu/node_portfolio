import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SocialHandle } from './schemas/socialHandle.schema';
import { Model } from 'mongoose';

@Injectable()
export class SocialHandleRepository {
    constructor(
        @InjectModel(SocialHandle.name) private readonly SocialHandle: Model<SocialHandle>,
    ) { }

    async updateCustomWithOptions(filter: any, fields: any, options: any = {}) {
        return await this.SocialHandle.updateOne(filter, fields, options)
    }

    async findOneWithCustomFields(filter: any) {
        return await this.SocialHandle.findOne(filter).lean()
    }

    async findAll(filter: any = {}) {
        return await this.SocialHandle.find(filter).lean()
    }
}