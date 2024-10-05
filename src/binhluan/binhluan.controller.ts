import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, NotFoundException, ParseIntPipe, Res, UseGuards } from '@nestjs/common';
import { BinhluanService } from './binhluan.service';
import { CreateBinhluanDto } from './dto/create-binhluan.dto';
import { UpdateBinhluanDto } from './dto/update-binhluan.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { responseError, responseSuccess } from 'src/shared/response';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';

@ApiTags("BinhLuan")
@Controller('api/binh-luan')
@ApiBearerAuth()
@UseGuards(AuthGuard("jwt"))
export class BinhluanController {
  constructor(private readonly binhluanService: BinhluanService) {}

  @Post()
  async create(@Body() createBinhluanDto: CreateBinhluanDto,@Res() res:Response) {
    try {
      const newBinhLuan = await this.binhluanService.create(createBinhluanDto)
      return responseSuccess(res,newBinhLuan,"BinhLuan created successfully",HttpStatus.CREATED);
    } catch (error) {
      return responseError(res,error,HttpStatus.BAD_REQUEST)
    }
  }

  @Get()
  @ApiOperation({summary:'Get All BinhLuan'})
  @ApiResponse({status:HttpStatus.OK, description:'Get All BinhLuan Successfully!'})
  @ApiResponse({status:HttpStatus.INTERNAL_SERVER_ERROR, description:'Error Server'})
  findAll() {
    return this.binhluanService.findAll();
  }

  @Get('/get-binh-luan-theo-ma-phong/:ma_phong')
  getBinhLuanByMaPhong(@Param('ma_phong',ParseIntPipe) ma_phong: number) {
    return this.binhluanService.getBinhLuanByMaPhong(+ma_phong);
  }

  @Patch(':id')
  async update(@Param('id',ParseIntPipe) id: number, @Body() updateBinhluanDto: CreateBinhluanDto,@Res() res:Response) {
    try {
      const binhluan = await this.binhluanService.update(+id, updateBinhluanDto);
      return responseSuccess(res,binhluan,"BinhLuan updated successfully",HttpStatus.OK)
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
      await this.binhluanService.remove(+id);
      return responseSuccess(res,null,'BinhLuan deleted successfully',HttpStatus.OK)
    } catch (error) {
      if(error instanceof NotFoundException){
        return responseError(res,error,HttpStatus.NOT_FOUND)
      }
      return responseError(res,error,HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
