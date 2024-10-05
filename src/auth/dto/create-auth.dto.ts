import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateAuthDto {}

export class SignUpDto {
    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    pass_word: string;

    @ApiProperty()
    @IsNotEmpty()
    phone: string;

    @ApiProperty()
    birth_day: string;

    @ApiProperty()
    gender: string;

    @ApiProperty()
    role: string;

    @ApiProperty()
    avatar: string;
}

export class LoginDto {
    @ApiProperty()
    email: string;

    @ApiProperty()
    pass_word: string;
}