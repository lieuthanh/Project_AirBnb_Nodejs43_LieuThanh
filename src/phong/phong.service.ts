import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePhongDto } from './dto/create-phong.dto';
import { UpdatePhongDto } from './dto/update-phong.dto';
import { PrismaService } from 'prisma/prisma.service';
import { plainToClass } from 'class-transformer';

@Injectable()
export class PhongService {
  constructor(
    private prismaService: PrismaService
  ){}

  async uploadRoom(
    roomId: number,
    path: string
  ){
    try {
      const checkRoom = await this.prismaService.phong.findFirst({
          where: {
              id: roomId,
          },
      });
      if (checkRoom) 
      {
        const updatedRoom = await this.prismaService.phong.update({
            where: {
                id: roomId,
            },
            data: {
                hinh_anh: path,
            },
        });
        return updatedRoom;
    } else
      {
        throw new BadRequestException('Phong not found!');
      }
  } catch {
      throw new InternalServerErrorException(`Not found`);
  }
  }

  async create(createPhongDto: CreatePhongDto) {
    try {
        const result = await this.prismaService.phong.create({data: createPhongDto})
        const newPhong = {
          ...result,
          id: result.id
        }
        return newPhong
    } catch (error) {
      throw new InternalServerErrorException(`Failed to create Phong: ${error.message}`)
    }
  }

  async findAll() {
    let data = await this.prismaService.phong.findMany()
    return data
  }

  async phongPagination(
    pageIndex: number,
    pageSize: number,
    keyword: string
  ){
    try {
      const phongs = await this.prismaService.phong.findMany({
        where: keyword
            ? {
                ten_phong: {
                    contains: keyword
                }
            }
            : {},
        skip: (pageIndex - 1) * pageSize,
        take: pageSize
    });
    return phongs.map(phong => plainToClass(CreatePhongDto, phong));
    } catch (error) {
      throw new Error('Failed to fetch phong')
    }
  }

  async findOne(id: number) {
    let data = await this.prismaService.phong.findMany({
      where:{
        id,
      }
    })
    return data;
  }

  async getPhongByMaViTri(ma_vi_tri: number) {
    const vitri = await this.prismaService.phong.findFirst({
      where:{ma_vi_tri}
    })
    if(!vitri){
      throw new NotFoundException('maViTri not found')
    }
    return await this.prismaService.phong.findMany({
      where:{
        ma_vi_tri,
      }
    })
  }

  async update(id: number, updatePhongDto: UpdatePhongDto) {
    try {
      const phong = await this.prismaService.phong.findUnique({
        where:{id}
      })
      if(!phong){
        throw new NotFoundException("Phong not found")
      }
      const updatedPhong = await this.prismaService.phong.update({
        where: {id}, 
        data: updatePhongDto,
      })
      return updatedPhong;
    } catch (error) {
      if(error instanceof NotFoundException){
        throw error;
      }
      throw new InternalServerErrorException(`Failed to update phong: ${error.message}`)
    }
  }

  async remove(id: number) {
    try {
      const phong = await this.prismaService.phong.findUnique({
        where:{id}
      })
      if(!phong){
        throw new NotFoundException('Phong Not Found')
      }
      await this.prismaService.phong.delete({
        where:{id}
      })
    } catch (error) {
      if(error instanceof NotFoundException){
        throw error
      }
      throw new InternalServerErrorException(`Failed To Delete Phong: ${error.message}`)
    }
  }
}
