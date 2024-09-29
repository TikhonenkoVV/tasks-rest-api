import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/users/schemas/users/User.schema';

@Schema({ versionKey: false, timestamps: true })
export class Board {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true, default: '' })
    background: string;

    @Prop({ required: true, default: '' })
    dashboardIcon: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Owner' })
    owner: User;
}

export const BoardSchema = SchemaFactory.createForClass(Board);
