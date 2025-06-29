import { IsEmail, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { Optional } from '@nestjs/common';
import { IsObjectId } from 'src/common/decorators/isObjectId.decorator';
import { ObjectId } from 'mongoose';

export class updateProfileDto {
    @IsOptional()
    @IsObjectId()
    _id: ObjectId;

    @Optional()
    @IsString()
    about: string;

    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsEmail()
    email: string;

    @IsOptional()
    @IsString()
    phone: string;

    @IsOptional()
    @IsString()
    countryCode: string;

    @IsOptional()
    @IsString()
    jobTitle: string;
}