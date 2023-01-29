import { IsString } from "class-validator";

export class CreateTaskDto {
    @IsString()
    readonly title: string;

    @IsString()
    readonly description: string;

    @IsString()
    readonly user: string;

    @IsString({each: true})
    readonly tags: string[];
}