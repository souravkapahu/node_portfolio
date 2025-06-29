import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { IsObjectId } from 'src/common/decorators/isObjectId.decorator';

export class updateSkillDto {
    @IsOptional()
    @IsObjectId()
    _id: Types.ObjectId;

    @IsNotEmpty()
    @IsObjectId()
    user: Types.ObjectId;

    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    link: string;
}

export class profileIdDto {
    @IsNotEmpty()
    @IsObjectId()
    profile: Types.ObjectId;
}