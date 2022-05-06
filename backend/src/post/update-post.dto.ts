import {IsOptional, IsString} from "class-validator";

export class UpdatePostDto {
    @IsString()
    @IsOptional()
    title?: string;

    @IsOptional()
    @IsString()
    content?: string;
}