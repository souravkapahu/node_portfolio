import { Injectable } from '@nestjs/common';
import { SocialHandleRepository } from './socialHandle.repository';

@Injectable()
export class SocialhandleService {
    constructor(
        private readonly socialHandleRepository: SocialHandleRepository
    ) { }

    async update(body: any, file: any) {
        const { name, user } = body
        const updateObj = { ...(file && { icon: file.path }) }

        for (let key in body) if (body[key]) updateObj[key] = body[key]
        return await this.socialHandleRepository.updateCustomWithOptions({ name, user }, updateObj, { upsert: true })
    }

    async list(user: any) {
        return await this.socialHandleRepository.findAll({ user })
    }
}