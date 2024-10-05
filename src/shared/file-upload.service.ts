import { ApiProperty } from "@nestjs/swagger";
import { diskStorage } from "multer"

export const getStorageOption = (destination: string) => {
    return diskStorage({
      destination: process.cwd() + `/public/imgs/${destination}`,
      filename:(req,file,callback) => callback(null, new Date().getTime() + "_" + file.originalname)
    })
  }

  export class FileUploadDto {
    @ApiProperty({ type: 'string', format: 'binary' })
    hinhAnh: any;
}

export class FilesUploadDto {
    @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
    hinhAnh: any[];
}