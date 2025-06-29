import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Skill } from './schemas/skill.schema';
import { Model } from 'mongoose';

@Injectable()
export class SkillRepository {
    constructor(
        @InjectModel(Skill.name) private readonly Skill: Model<Skill>,
    ) { }

    async updateCustomWithOptions(filter: any, fields: any, options: any = {}) {
        return await this.Skill.updateOne(filter, fields, options)
    }

    async findOneWithCustomFields(filter: any) {
        return await this.Skill.findOne(filter).lean()
    }

    async findAll(filter: any) {
        return await this.Skill.find(filter).lean()
    }
}