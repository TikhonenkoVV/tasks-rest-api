import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ versionKey: false, timestamps: true })
export class User {
    @Prop({ required: true })
    password: string;

    @Prop({ unique: true, required: true })
    email: string;

    @Prop({ required: true })
    name: string;

    @Prop()
    theme: string;

    @Prop()
    avatarURL: string;

    @Prop()
    avatarURLsmall: string;

    @Prop()
    refreshToken: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
