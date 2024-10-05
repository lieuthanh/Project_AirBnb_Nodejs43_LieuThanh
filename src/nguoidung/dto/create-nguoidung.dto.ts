import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";

export enum UserRole{
    User = 'User',
    Admin = 'Admin',
    Moderate = 'Moderate'
}

export enum GenderRole{
    Male = 'Male',
    Female = 'Female',
    Other = 'Other'
}

export class CreateNguoidungDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string

    @ApiProperty()
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    pass_word: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    phone: string

    @ApiProperty()
    birth_day: string

    @ApiProperty({enum: GenderRole, enumName: 'GenderRole'})
    @IsString()
    @IsEnum(GenderRole)
    gender: GenderRole

    @ApiProperty({enum: UserRole, enumName: 'UserRole'})
    @IsString()
    @IsEnum(UserRole)
    role: UserRole

    @ApiProperty()
    @IsString()
    @IsOptional()
    avatar?: string

}


      