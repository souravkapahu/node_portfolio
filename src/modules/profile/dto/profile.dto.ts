import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class updateProfileDto {
    @IsOptional()
    @IsString()
    about: string;

    @IsOptional()
    @IsString()
    name: string;

    @IsNotEmpty()
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