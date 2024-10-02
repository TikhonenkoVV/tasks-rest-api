import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Column } from 'src/columns/schemas/columns/Column.schema';

@Schema({ versionKey: false, timestamps: true })
export class Task {
    @Prop({ default: '' })
    title: string;

    @Prop({ default: '' })
    description: string;

    @Prop({ enum: ['without', 'low', 'high', 'medium'], default: 'without' })
    priority: string;

    @Prop({ required: true, default: Date.now })
    deadline: Date;

    @Prop({ required: true })
    index: number;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Owner' })
    owner: Column;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
