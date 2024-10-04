import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateTaskDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    priority: string;

    @IsDate()
    @Type(() => Date)
    deadline: Date;

    @IsNotEmpty()
    @IsNumber()
    index: number;

    @IsNotEmpty()
    @IsString()
    owner: string;
}
