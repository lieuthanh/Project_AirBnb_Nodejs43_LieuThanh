import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateBinhluanDto {
    @ApiProperty()
    @IsNotEmpty()
    ma_cong_viec:number

    @ApiProperty()
    @IsNotEmpty()
    ma_nguoi_binh_luan: number

    @ApiProperty()
    ngay_binh_luan:Date

    @ApiProperty()
    noi_dung:string

    @ApiProperty()
    sao_binh_luan:number

}
