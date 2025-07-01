import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { SkillRepository } from './skill.repository';

@Injectable()
export class SkillsService {
    constructor(private readonly skillRepository: SkillRepository) { }

    async updateSkills(body: any, file: any) {
        const { name, user } = body
        const updateObj = { ...(file && { icon: file.path }) }
        for (let key in body) if (body[key]) updateObj[key] = body[key]

        await this.skillRepository.updateCustomWithOptions({ name, user }, updateObj, { upsert: true })

        return true
    }


    async getSkills(params: any): Promise<any> {
        const { profile } = params
        return await this.skillRepository.findAll({ user: profile })
    }
}
