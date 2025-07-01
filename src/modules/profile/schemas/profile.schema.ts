import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Profile extends Document {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    phone: string;

    @Prop({ required: true })
    countryCode: string;

    @Prop({ default: null })
    about: string;

    @Prop({ default: null })
    jobTitle: string;

    @Prop({ default: null })
    image: string;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);

ProfileSchema.index({ email: 1 })