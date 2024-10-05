import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, ParseIntPipe, Res, NotFoundException, Query, UseInterceptors, UploadedFile, Req, UseGuards } from '@nestjs/common';
import { VitriService } from './vitri.service';
import { CreateVitriDto } from './dto/create-vitri.dto';
import { UpdateVitriDto } from './dto/update-vitri.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { responseError, responseSuccess } from 'src/shared/response';
import { FileUploadDto, getStorageOption } from 'src/shared/file-upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';

@ApiTags("ViTri")
@Controller('api/vi-tri')
@ApiBearerAuth()
@UseGuards(AuthGuard("jwt"))
export class VitriController {
  constructor(private readonly vitriService: VitriService) {}

  @Post("/upload-ViTri/:id")
  @ApiConsumes('multipart/form-data')
  @ApiBody({
  description: 'HinhAnh',
  type: FileUploadDto,
})
  @UseInterceptors(FileInterceptor('hinhAnh', { storage: getStorageOption('location') }))
  async uploadLocation(@Param("id",ParseIntPipe) id: number,@UploadedFile() file:Express.Multer.File,@Req() req:Request){
    let path = `${file.filename}`
    return this.vitriService.uploadLocation(id,path)
  }

  @Post()
  async create(@Body() createVitriDto: CreateVitriDto,@Res() res:Response) {
    try {
      const newViTri = await this.vitriService.create(createVitriDto)
      return responseSuccess(res,newViTri,"ViTri created successfully",HttpStatus.CREATED);
    } catch (error) {
      return responseError(res,error,HttpStatus.BAD_REQUEST)
    }
  }

  @Get()
  @ApiOperation({summary:'Get All ViTri'})
  @ApiResponse({status:HttpStatus.OK, description:'Get All ViTri Successfully!'})
  @ApiResponse({status:HttpStatus.INTERNAL_SERVER_ERROR, description:'Error Server'})
  findAll() {
    return this.vitriService.findAll();
  }

  @Get("/vi-tri-phan-trang")
  async vitriPagination(
    @Query('pageIndex',ParseIntPipe) pageIndex: number,
    @Query('pageSize',ParseIntPipe) pageSize: number,
    @Query('keyword') keyword: string,
    @Res() res:Response
  ){
    try {
      let vitri = await this.vitriService.vitriPagination(pageIndex,pageSize,keyword)
      return responseSuccess(res,vitri,"ViTri Pagination Successfully",HttpStatus.OK)
    } catch (error) {
      return responseError(res,error,HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Get(':id')
  findOne(@Param('id',ParseIntPipe) id: number) {
    return this.vitriService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id',ParseIntPipe) id: number, @Body() updateVitriDto: CreateVitriDto,@Res() res:Response) {
    try {
      const vitri = await this.vitriService.update(+id, updateVitriDto);
      return responseSuccess(res,vitri,"ViTri updated successfully",HttpStatus.OK)
    } catch (error) {
      if(error instanceof NotFoundException){
        return responseError(res,error,HttpStatus.NOT_FOUND)
      }
      return responseError(res,error,HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Delete(':id')
  async remove(@Param('id',ParseIntPipe) id: number, @Res() res:Response) {
    try {
      await this.vitriService.remove(+id);
      return responseSuccess(res,null,'ViTri deleted successfully',HttpStatus.OK)
    } catch (error) {
      if(error instanceof NotFoundException){
        return responseError(res,error,HttpStatus.NOT_FOUND)
      }
      return responseError(res,error,HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
