import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Profile } from 'src/modules/profile/schemas/profile.schema';

@Schema({ timestamps: true })
export class Skill extends Document {
    @Prop({ type: Types.ObjectId, ref: Profile.name, required: true })
    user: Types.ObjectId;

    @Prop({ required: true })
    name: string;

    @Prop({ default: null })
    link: string;

    @Prop({ required: true })
    icon: string;
}

export const SkillSchema = SchemaFactory.createForClass(Skill);

SkillSchema.index({ name: 1 })