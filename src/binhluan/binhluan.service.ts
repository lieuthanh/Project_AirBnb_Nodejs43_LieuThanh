import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateBinhluanDto } from './dto/create-binhluan.dto';
import { UpdateBinhluanDto } from './dto/update-binhluan.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class BinhluanService {
  constructor(
    private prismaService: PrismaService
  ){}

  async create(createBinhluanDto: CreateBinhluanDto) {
    try {
        const sao_binh_luan = createBinhluanDto.sao_binh_luan
        if(sao_binh_luan < 1 || sao_binh_luan > 5){
          throw new BadRequestException(`Star of comment is between 1 to 5`)
        }
        const result = await this.prismaService.binhLuan.create({data: createBinhluanDto})
        const newBinhLuan = {
          ...result,
          id: result.id
        }
        return newBinhLuan;
    } catch (error) {
        throw new InternalServerErrorException(`Failed to create BinhLuan: ${error.message}`)
    }
  }

  async findAll() {
    let data = await this.prismaService.binhLuan.findMany()
    return data;
  }

  async getBinhLuanByMaPhong(ma_phong: number) {
    const binhluan = await this.prismaService.binhLuan.findFirst({
      where:{ma_cong_viec:ma_phong}
    })
    if(!binhluan){
      throw new NotFoundException("Ma_phong not found")
    }
    let data = await this.prismaService.binhLuan.findMany({
      where:{
        ma_cong_viec: ma_phong
      }
    })
    return data;
  }

  async update(id: number, updateBinhluanDto: UpdateBinhluanDto) {
    try {
      const binhluan = await this.prismaService.binhLuan.findUnique({
        where:{id}
      })
      if(!binhluan){
        throw new NotFoundException("BinhLuan not found")
      }
      const sao_binh_luan = updateBinhluanDto.sao_binh_luan
        if(sao_binh_luan < 1 || sao_binh_luan > 5){
          throw new BadRequestException(`Star of comment is between 1 to 5`)
        }
      const updatedBinhLuan = await this.prismaService.binhLuan.update({
        where: {id}, 
        data: updateBinhluanDto,
      })
      return updatedBinhLuan;
    } catch (error) {
      if(error instanceof NotFoundException){
        throw error;
      }
      throw new InternalServerErrorException(`Failed to update BinhLuan: ${error.message}`)
    }
  }

  async remove(id: number) {
    try {
      const binhluan = await this.prismaService.binhLuan.findUnique({
        where:{id}
      })
      if(!binhluan){
        throw new NotFoundException('BinhLuan not found')
      }
      await this.prismaService.binhLuan.delete({
        where:{id}
      })
    } catch (error) {
      if(error instanceof NotFoundException){
        throw error
      }
      throw new InternalServerErrorException(`Failed to delete BinhLuan: ${error.message}`)
    }
  }
}
