import { IsNotEmpty } from 'class-validator';

export class CreateBoardDto {
    @IsNotEmpty()
    title: String;
    @IsNotEmpty()
    background: String;
    @IsNotEmpty()
    dashboardIcon: String;
    // @IsNotEmpty()
    owner?: string;
}
