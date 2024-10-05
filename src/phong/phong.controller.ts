import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, ParseIntPipe, Res, NotFoundException, UseInterceptors, UploadedFile, UploadedFiles, Query, Req, UseGuards } from '@nestjs/common';
import { PhongService } from './phong.service';
import { CreatePhongDto } from './dto/create-phong.dto';
import { UpdatePhongDto } from './dto/update-phong.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { responseError, responseSuccess } from 'src/shared/response';
import { Response } from 'express';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { FileUploadDto, FilesUploadDto, getStorageOption } from 'src/shared/file-upload.service';
import { diskStorage } from 'multer';
import { AuthGuard } from '@nestjs/passport';

@ApiTags("Phong")
@Controller('api/phong-thue')
@ApiBearerAuth()
@UseGuards(AuthGuard("jwt"))
export class PhongController {
  constructor(private readonly phongService: PhongService) {}

  @Post("/upload-phong/:id")
  @ApiConsumes('multipart/form-data')
  @ApiBody({
  description: 'HinhAnh',
  type: FileUploadDto,
})
  @UseInterceptors(FileInterceptor('hinhAnh', { storage: getStorageOption('room') }))
  async uploadRoom(@Param("id",ParseIntPipe) id: number,@UploadedFile() file:Express.Multer.File,@Req() req:Request){
    let path = `${file.filename}`
    return this.phongService.uploadRoom(id,path)
  }

  @Post()
  async create(@Body() createPhongDto: CreatePhongDto,@Res() res:Response) {
    try {
      const newPhong = await this.phongService.create(createPhongDto);
      return responseSuccess(res,newPhong,"Phong created successfully",HttpStatus.CREATED);
    } catch (error) {
      return responseError(res,error,HttpStatus.BAD_REQUEST)
    }
  }

  @Get()
  @ApiOperation({summary:'Get All Phong'})
  @ApiResponse({status:HttpStatus.OK, description:'Get All Phong Successfully!'})
  @ApiResponse({status:HttpStatus.INTERNAL_SERVER_ERROR, description:'Error Server'})
  findAll() {
    return this.phongService.findAll();
  }

  @Get("/phong-phan-trang")
  async phongPagination(
    @Query('pageIndex',ParseIntPipe) pageIndex: number,
    @Query('pageSize',ParseIntPipe) pageSize: number,
    @Query('keyword') keyword: string,
    @Res() res:Response
  ){
    try {
      let phong = await this.phongService.phongPagination(pageIndex,pageSize,keyword)
      return responseSuccess(res,phong,"Phong Pagination Successfully",HttpStatus.OK)
    } catch (error) {
      return responseError(res,error,HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Get(':id')
  findOne(@Param('id',ParseIntPipe) id: number) {
    return this.phongService.findOne(+id);
  }

  @Get("/get-phong-theo-vi-tri/:maViTri")
  getPhongByMaViTri(@Param("maViTri",ParseIntPipe) maViTri: number){
    return this.phongService.getPhongByMaViTri(maViTri)
  }

  @Patch(':id')
  async update(@Param('id',ParseIntPipe) id: number, @Body() updatePhongDto: CreatePhongDto,@Res() res:Response) {
    try {
      const phong = await this.phongService.update(+id, updatePhongDto);
      return responseSuccess(res,phong,"Phong updated successfully",HttpStatus.OK)
    } catch (error) {
      if(error instanceof NotFoundException){
        return responseError(res,error,HttpStatus.NOT_FOUND)
      }
      return responseError(res,error,HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Delete(':id')
  async remove(@Param('id',ParseIntPipe) id: number,@Res() res:Response) {
    try {
      await this.phongService.remove(+id);
      return responseSuccess(res,null,"Phong deleted successfully",HttpStatus.OK)
    } catch (error) {
      if(error instanceof NotFoundException){
        return responseError(res,error,HttpStatus.NOT_FOUND)
      }
      return responseError(res,error,HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
