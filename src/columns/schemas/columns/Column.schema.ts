import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import mongoose from 'mongoose';
import { Board } from 'src/boards/schemas/boards/Board.schema';
import { Task } from 'src/tasks/schemas/Task.schema';

@Schema({
    versionKey: false,
    timestamps: true,
    toJSON: { getters: true, virtuals: true },
    toObject: { virtuals: true },
    id: false,
})
export class Column {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    index: number;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Owner' })
    owner: Board;

    @Type(() => Task)
    cards: Task[];
}

const ColumnSchema = SchemaFactory.createForClass(Column);

ColumnSchema.virtual('cards', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner',
});

export { ColumnSchema };
