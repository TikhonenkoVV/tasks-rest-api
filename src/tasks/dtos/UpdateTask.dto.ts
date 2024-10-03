import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateTaskDto {
    @IsNotEmpty()
    @IsString()
    title: String;

    @IsString()
    description: String;

    @IsNotEmpty()
    @IsString()
    priority: String;

    @IsDate()
    @Type(() => Date)
    deadline: Date;

    @IsNotEmpty()
    @IsNumber()
    index: Number;

    @IsNotEmpty()
    @IsString()
    owner: string;
}
