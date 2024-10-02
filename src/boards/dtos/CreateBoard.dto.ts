import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBoardDto {
    @IsNotEmpty()
    @IsString()
    title: String;
    @IsNotEmpty()
    @IsString()
    background: String;
    @IsNotEmpty()
    @IsString()
    dashboardIcon: String;
}
