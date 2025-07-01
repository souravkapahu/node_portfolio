import { Injectable } from '@nestjs/common';
import { ProfileRepository } from './profile.repository';
import { ConfigService } from '@nestjs/config';
import { Profile } from 'src/interfaces/profile/profile.interface';
import { profileConstant } from '../../constants'

const message = profileConstant.profile

@Injectable()
export class ProfileService {
    email: any
    constructor(
        private readonly profileRepository: ProfileRepository,
        private readonly configService: ConfigService
    ) {
        this.email = this.configService.get<string>('email')
    }

    async updateProfile(body: any, file: any): Promise<boolean> {
        const { email } = body
        const updateObj = { ...(file && { image: file.path }) }

        for (let key in body) if (body[key]) updateObj[key] = body[key]

        await this.profileRepository.updateCustomWithOptions({ email }, updateObj, { upsert: true })

        return true
    }

    async getProfile(): Promise<Profile | any> {
        const profile = await this.profileRepository.findOneWithCustomFields({ email: this.email })

        if (!profile) throw new Error(message.getProfile)
        return profile;
    }
}
