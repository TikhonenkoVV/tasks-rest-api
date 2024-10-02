import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTaskDto {
    @IsNotEmpty()
    @IsString()
    title: String;

    @IsString()
    description: String;

    @IsNotEmpty()
    @IsString()
    priority: String;

    @IsDate()
    deadline: Date;

    @IsNotEmpty()
    @IsNumber()
    index: Number;

    @IsNotEmpty()
    @IsString()
    owner: string;
}
