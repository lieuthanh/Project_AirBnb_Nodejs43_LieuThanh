import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class CreateVitriDto {
    @ApiProperty()
    ten_vi_tri: string

    @ApiProperty()
    tinh_thanh: string

    @ApiProperty()
    quoc_gia: string

    @ApiProperty()
    @IsOptional()
    hinh_anh?: string

}
