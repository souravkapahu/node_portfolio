import { Injectable } from '@nestjs/common';
import { SocialHandleRepository } from './socialHandle.repository';
import { uploadToCloudinary } from 'src/common/utils/cloudinary';

@Injectable()
export class SocialhandleService {
    constructor(
        private readonly socialHandleRepository: SocialHandleRepository
    ) { }

    async update(body: any, file: any) {
        const { name, user } = body
        const updateObj: any = {}

        if (file) {
            const icon = await uploadToCloudinary(file, 'socialhandle');
            updateObj.icon = icon.secure_url
        }

        for (let key in body) if (body[key]) updateObj[key] = body[key]
        return await this.socialHandleRepository.updateCustomWithOptions({ name, user }, updateObj, { upsert: true })
    }

    async list(user: any) {
        return await this.socialHandleRepository.findAll({ user })
    }
}