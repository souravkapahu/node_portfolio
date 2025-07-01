import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { IsObjectId } from 'src/common/decorators/isObjectId.decorator';
import { ObjectId } from 'mongoose';

export class createProjectDto {
    @IsNotEmpty()
    @IsObjectId()
    user: ObjectId;

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    link: string;
}

export class updateProjectDto {
    @IsNotEmpty()
    @IsObjectId()
    _id: ObjectId;

    @IsOptional()
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    description: string;

    @IsOptional()
    @IsString()
    link: string;
}

export class listDto {
    @IsNotEmpty()
    @IsObjectId()
    user: ObjectId;

    @IsOptional()
    @IsNumber()
    offset: number;

    @IsOptional()
    @IsNumber()
    limit: number;
}