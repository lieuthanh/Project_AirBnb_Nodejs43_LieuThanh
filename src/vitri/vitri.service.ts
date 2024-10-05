import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateVitriDto } from './dto/create-vitri.dto';
import { UpdateVitriDto } from './dto/update-vitri.dto';
import { PrismaService } from 'prisma/prisma.service';
import { plainToClass } from 'class-transformer';

@Injectable()
export class VitriService {
  constructor(
    private prismaService: PrismaService
  ){}

  async uploadLocation(
    locId: number,
    path: string,
){
    try {
        const checkLoc = await this.prismaService.viTri.findFirst({
            where: {
                id: locId,
            },
        });

        if (checkLoc) {
            const updatedLoc = await this.prismaService.viTri.update({
                where: {
                    id: locId,
                },
                data: {
                    hinh_anh: path,
                },
            });

            return updatedLoc;
        } else {
            throw new BadRequestException('Location not found!');
        }
    } catch {
        throw new InternalServerErrorException('Location not found!');
    }
}

  async create(createVitriDto: CreateVitriDto) {
    try {
      const result = await this.prismaService.viTri.create({data: createVitriDto})
      const newViTri = {
        ...result,
        id: result.id
      }
      return newViTri;
    } catch (error) {
      throw new InternalServerErrorException(`Failed to create ViTri: ${error.message}`)
    }
  }

  async findAll() {
    let data = await this.prismaService.viTri.findMany();
    return data;
  }

  async vitriPagination(
    pageIndex: number,
    pageSize: number,
    keyword: string
  ){
    try {
      const vitris = await this.prismaService.viTri.findMany({
        where: keyword
            ? {
                ten_vi_tri: {
                    contains: keyword
                }
            }
            : {},
        skip: (pageIndex - 1) * pageSize,
        take: pageSize
    });
    return vitris.map(vitri => plainToClass(CreateVitriDto, vitri));
    } catch (error) {
      throw new Error('Failed to fetch ViTri')
    }
  }

  async findOne(id: number) {
    let data = await this.prismaService.viTri.findMany({
      where:{
        id,
      }
    })
    return data;  }

  async update(id: number, updateVitriDto: UpdateVitriDto) {
    try {
      const vitri = await this.prismaService.viTri.findUnique({
        where:{id}
      })
      if(!vitri){
        throw new NotFoundException("ViTri not found")
      }
      const updatedViTri = await this.prismaService.viTri.update({
        where: {id}, 
        data: updateVitriDto,
      })
      return updatedViTri;
    } catch (error) {
      if(error instanceof NotFoundException){
        throw error;
      }
      throw new InternalServerErrorException(`Failed to update vitri: ${error.message}`)
    }
  }

  async remove(id: number) {
    try {
      const vitri = await this.prismaService.viTri.findUnique({
        where:{id}
      })
      if(!vitri){
        throw new NotFoundException('ViTri not found')
      }
      await this.prismaService.viTri.delete({
        where:{id}
      })
    } catch (error) {
      if(error instanceof NotFoundException){
        throw error
      }
      throw new InternalServerErrorException(`Failed to delete ViTri: ${error.message}`)
    }
  }
}
