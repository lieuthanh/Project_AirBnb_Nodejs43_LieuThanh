import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, ParseIntPipe, Res, NotFoundException, Query, UseGuards } from '@nestjs/common';
import { DatphongService } from './datphong.service';
import { CreateDatphongDto } from './dto/create-datphong.dto';
import { UpdateDatphongDto } from './dto/update-datphong.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DatPhong } from '@prisma/client';
import { Response } from 'express';
import { responseError, responseSuccess } from 'src/shared/response';
import { AuthGuard } from '@nestjs/passport';

@ApiTags("DatPhong")
@Controller('api/dat-phong')
@ApiBearerAuth()
@UseGuards(AuthGuard("jwt"))
export class DatphongController {
  constructor(private readonly datphongService: DatphongService) {}

  @Post()
  async create(@Body() createDatphongDto: CreateDatphongDto,@Res() res:Response) {
    try {
      const newDatPhong = await this.datphongService.create(createDatphongDto);
      return responseSuccess(res,newDatPhong,"DatPhong created successfully",HttpStatus.CREATED);
    } catch (error) {
      return responseError(res,error,HttpStatus.BAD_REQUEST)
    }
  }

  @Get()
  @ApiOperation({summary:'Get All DatPhong'})
  @ApiResponse({status:HttpStatus.OK, description:'Get All DatPhong Successfully!'})
  @ApiResponse({status:HttpStatus.INTERNAL_SERVER_ERROR, description:'Error Server'})
  findAll() {
    return this.datphongService.findAll();
  }

  @Get(':id')
  findOne(@Param('id',ParseIntPipe) id: number) {
    return this.datphongService.findOne(+id);
  }

  @Get("/get-phong-theo-ma-nguoi-dat/:maNguoiDat")
  getPhongByMaNguoiDat(@Param("maNguoiDat",ParseIntPipe) maNguoiDat: number){
    return this.datphongService.getPhongByMaNguoiDat(maNguoiDat)
  }

  @Patch(':id')
  async update(@Param('id',ParseIntPipe) id: number, @Body() updateDatphongDto: CreateDatphongDto,@Res() res:Response) {
    try {
      const datphong = await this.datphongService.update(+id, updateDatphongDto);
      return responseSuccess(res,datphong,"DatPhong updated successfully",HttpStatus.OK)
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
      await this.datphongService.remove(+id);
      return responseSuccess(res,null,'DatPhong deleted successfully',HttpStatus.OK)
    } catch (error) {
      if(error instanceof NotFoundException){
        return responseError(res,error,HttpStatus.NOT_FOUND)
      }
      return responseError(res,error,HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
