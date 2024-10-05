import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateDatphongDto } from './dto/create-datphong.dto';
import { UpdateDatphongDto } from './dto/update-datphong.dto';
import { PrismaService } from 'prisma/prisma.service';
import { DatPhong } from '@prisma/client';

@Injectable()
export class DatphongService {
  constructor(
    private prismaService: PrismaService
  ){}

  async create(createDatphongDto: CreateDatphongDto) {
    try {
        const ngay_den = new Date(createDatphongDto.ngay_den)
        const ngay_di = new Date(createDatphongDto.ngay_di)
        if(ngay_di.getTime() < ngay_den.getTime()){
          throw new BadRequestException(`Failed to create DatPhong: Arrival Date must be later than Departure Date`)
        }
        const result = await this.prismaService.datPhong.create({data: createDatphongDto})
        const newDatPhong = {
          ...result,
          id: result.id
        }
        return newDatPhong;
      } catch (error) {
      throw new InternalServerErrorException(`Failed to create DatPhong: ${error.message}`)
    }
  }

  async findAll() {
    let data = await this.prismaService.datPhong.findMany()
    return data;
  }

  async findOne(id: number) {
    let data = await this.prismaService.datPhong.findMany({
      where:{
        id,
      }
    })
    return data;
  }

  async getPhongByMaNguoiDat(ma_nguoi_dat: number) {
    const datphong = await this.prismaService.datPhong.findFirst({
      where:{ma_nguoi_dat: ma_nguoi_dat}
    })
    if(!datphong){
      throw new NotFoundException('maNguoiDat not found')
    }
    return await this.prismaService.datPhong.findMany({
      where:{
        ma_nguoi_dat,
      }
    })
  }

  async update(id: number, updateDatphongDto: UpdateDatphongDto) {
    try {
      const datphong = await this.prismaService.datPhong.findUnique({
        where:{id}
      })
      if(!datphong){
        throw new NotFoundException("DatPhong not found")
      }
      const ngay_den = new Date(updateDatphongDto.ngay_den)
      const ngay_di = new Date(updateDatphongDto.ngay_di)
      if(ngay_di.getTime() < ngay_den.getTime()){
          throw new BadRequestException(`Failed to create DatPhong: Arrival Date must be later than Departure Date`)
        }
      const updatedDatPhong = await this.prismaService.datPhong.update({
        where: {id}, 
        data: updateDatphongDto,
      })
      return updatedDatPhong;
    } catch (error) {
      if(error instanceof NotFoundException){
        throw error;
      }
      throw new InternalServerErrorException(`Failed to update DatPhong: ${error.message}`)
    }
  }

  async remove(id: number) {
    try {
      const datphong = await this.prismaService.datPhong.findUnique({
        where:{id}
      })
      if(!datphong){
        throw new NotFoundException('DatPhong not found')
      }
      await this.prismaService.datPhong.delete({
        where:{id}
      })
    } catch (error) {
      if(error instanceof NotFoundException){
        throw error
      }
      throw new InternalServerErrorException(`Failed to delete DatPhong: ${error.message}`)
    }
  }
}
