import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateColumnDto {
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
