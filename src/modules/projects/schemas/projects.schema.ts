import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Profile } from 'src/modules/profile/schemas/profile.schema';

@Schema({ timestamps: true })
export class Project extends Document {
    @Prop({ type: Types.ObjectId, ref: Profile.name, required: true })
    user: Types.ObjectId;

    @Prop({ required: true })
    logo: string;

    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    link: string;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);