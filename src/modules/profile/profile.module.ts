import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileRepository } from './profile.repository';
import { ProfileAggregationService } from './aggregations/profile.aggregation';
import { MongooseModule } from '@nestjs/mongoose';
import { Profile, ProfileSchema } from './schemas/profile.schema';
import { ProfileService } from './profile.service';

@Module({
    controllers: [ProfileController],
    providers: [
        ProfileRepository,
        ProfileAggregationService,
        ProfileService
    ],
    imports: [
        MongooseModule.forFeature([
            { name: Profile.name, schema: ProfileSchema }
        ])
    ],
    exports: [ProfileRepository]
})
export class ProfileModule { }
