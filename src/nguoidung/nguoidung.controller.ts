import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UploadedFiles, UseGuards, HttpStatus, Res, NotFoundException, ParseIntPipe, Req, Query } from '@nestjs/common';
import { NguoidungService } from './nguoidung.service';
import { CreateNguoidungDto } from './dto/create-nguoidung.dto';
import { UpdateNguoidungDto } from './dto/update-nguoidung.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { FileUploadDto, getStorageOption } from 'src/shared/file-upload.service';
import { responseError, responseSuccess } from 'src/shared/response';
import { Request, Response } from 'express';

@ApiTags("NguoiDung")
@Controller('api/users')
@ApiBearerAuth()
@UseGuards(AuthGuard("jwt"))
export class NguoidungController {
  constructor(private readonly nguoidungService: NguoidungService, private configService: ConfigService,
    ) {}

  @Post("/upload-avatar/:id")
  @ApiConsumes('multipart/form-data')
  @ApiBody({
  description: 'HinhAnh',
  type: FileUploadDto,
})
  @UseInterceptors(FileInterceptor('hinhAnh', { storage: getStorageOption('avatar') }))
  async uploadAvatar(@Param("id",ParseIntPipe) id: number,@UploadedFile() file:Express.Multer.File,@Req() req:Request,@Res() res:Response){
    try {
      let path = `${file.filename}`
    const avatar = await this.nguoidungService.uploadAvatar(id,path)
      return responseSuccess(res,avatar,"Thành công",HttpStatus.CREATED)
    } catch (error) {
      return responseError(res,error,HttpStatus.BAD_REQUEST)
    }
  }

  @Post()
  async create(@Body() createNguoidungDto: CreateNguoidungDto,@Res() res:Response) {
    try {
      const user = await this.nguoidungService.create(createNguoidungDto);
      return responseSuccess(res,user,"User created successfully",HttpStatus.CREATED);
    } catch (error) {
      return responseError(res,error,HttpStatus.BAD_REQUEST)
    }
  }

  @Get()
  @ApiOperation({summary:'Get All Users'})
  @ApiResponse({status:HttpStatus.OK, description:'Get All Users Successfully!'})
  @ApiResponse({status:HttpStatus.INTERNAL_SERVER_ERROR, description:'Error Server'})
  findAll() {
    return this.nguoidungService.findAll();
  }

  @Get(':id')
  findOne(@Param('id',ParseIntPipe) id: number) {
    return this.nguoidungService.findOne(+id);
  }

  @Get("/get/nguoi-dung-phan-trang")
  async userPagination(
    @Query('pageIndex',ParseIntPipe) pageIndex: number,
    @Query('pageSize',ParseIntPipe) pageSize: number,
    @Query('keyword') keyword: string,
    @Res() res:Response
  ){
    try {
      let user = await this.nguoidungService.userPagination(pageIndex,pageSize,keyword)
      return responseSuccess(res,user,"User Pagination Successfully",HttpStatus.OK)
    } catch (error) {
      return responseError(res,error,HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Get("/search/:tenNguoiDung")
  searchByName(@Param("tenNguoiDung") tenNguoiDung: string){
    return this.nguoidungService.searchByName(tenNguoiDung)
  }

  @Patch(':id')
  async update(@Param('id',ParseIntPipe) id: number, @Body() updateNguoidungDto: CreateNguoidungDto,@Res() res:Response) {
    try {
      const user = await this.nguoidungService.update(+id, updateNguoidungDto);
      return responseSuccess(res,user,"User updated successfully",HttpStatus.OK)
    } catch (error) {
      if(error instanceof NotFoundException){
        return responseError(res,error,HttpStatus.NOT_FOUND)
      }
      return responseError(res,error,HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Delete(':id')
  async remove(@Param('id',ParseIntPipe) id: number,@Res() res:Response) {
    try{
      await this.nguoidungService.remove(+id);
      return responseSuccess(res,null,"User deleted successfully",HttpStatus.OK);
    }catch(error){
      if(error instanceof NotFoundException){
        return responseError(res,error,HttpStatus.NOT_FOUND)
      }
      return responseError(res,error,HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
