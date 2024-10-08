import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateColumnDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsNumber()
    index: number;

    @IsNotEmpty()
    @IsString()
    owner: string;
}
