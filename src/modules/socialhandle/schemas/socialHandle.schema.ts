import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Profile } from 'src/modules/profile/schemas/profile.schema';

@Schema({ timestamps: true })
export class SocialHandle extends Document {
    @Prop({ type: Types.ObjectId, ref: Profile.name, required: true })
    user: Types.ObjectId;

    @Prop({ required: true, lowercase: true })
    name: string

    @Prop({ required: true })
    link: string;

    @Prop({ required: true })
    icon: string;
}

export const SocialHandleSchema = SchemaFactory.createForClass(SocialHandle);

SocialHandleSchema.index({ name: 1 })