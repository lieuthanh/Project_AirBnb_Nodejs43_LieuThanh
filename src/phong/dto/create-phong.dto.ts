import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { Vitri } from "src/vitri/entities/vitri.entity";

export class CreatePhongDto {
    @ApiProperty()
    ten_phong: string

    @ApiProperty()
    khach: number

    @ApiProperty()
    phong_ngu: number

    @ApiProperty()
    giuong: number

    @ApiProperty()
    phong_tam: number

    @ApiProperty()
    mo_ta: string

    @ApiProperty()
    gia_tien: number

    @ApiProperty()
    may_giat: boolean

    @ApiProperty()
    ban_la: boolean

    @ApiProperty()
    tivi: boolean

    @ApiProperty()
    dieu_hoa: boolean

    @ApiProperty()
    wifi: boolean

    @ApiProperty()
    bep: boolean

    @ApiProperty()
    do_xe: boolean
    
    @ApiProperty()
    ho_boi: boolean

    @ApiProperty()
    @IsOptional()
    hinh_anh?: string

    @ApiProperty()
    @IsNotEmpty()
    ma_vi_tri: number

}
