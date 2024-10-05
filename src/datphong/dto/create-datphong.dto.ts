import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateDatphongDto {
    @ApiProperty()
    @IsNotEmpty()
    ma_phong: number

    @ApiProperty()
    ngay_den: Date

    @ApiProperty()
    ngay_di: Date

    @ApiProperty()
    so_luong_khach: number

    @ApiProperty()
    @IsNotEmpty()
    ma_nguoi_dat: number

}
