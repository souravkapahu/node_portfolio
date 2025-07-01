import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { IsObjectId } from 'src/common/decorators/isObjectId.decorator';

export class updateSocialDto {
    @IsNotEmpty()
    @IsObjectId()
    user: Types.ObjectId;

    @IsNotEmpty()
    @Transform(({ value }) => value.trim())
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    link: string;

    @IsOptional()
    @IsString()
    icon: string;
}

export class profileIdDto {
    @IsNotEmpty()
    @IsObjectId()
    profile: Types.ObjectId;
}