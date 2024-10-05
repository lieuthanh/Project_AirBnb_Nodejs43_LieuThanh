import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateNguoidungDto } from './dto/create-nguoidung.dto';
import { UpdateNguoidungDto } from './dto/update-nguoidung.dto';
import { PrismaService } from 'prisma/prisma.service';
import * as bcrypt from 'bcrypt'
import { plainToClass } from 'class-transformer';

@Injectable()
export class NguoidungService {
  constructor(
    private prismaService: PrismaService
  ){} 

    async uploadAvatar(
      userId: number,
      path: string
    ){
      try {
        const checkUser = await this.prismaService.nguoiDung.findFirst({
            where: {
                id: userId,
            },
        });
        if (!checkUser) {
          throw new ConflictException('User not found!');
          return;
        }
        else{
          const updatedUser = await this.prismaService.nguoiDung.update({
            where: {
                id: userId,
            },
            data: {
                avatar: path,
            },
        });
        return updatedUser;
        }
        
    } catch(error) {
      if(error instanceof NotFoundException){
        throw error;
      }
        throw new InternalServerErrorException(`${error.message}`);
    }
    }

  async userPagination(
    pageIndex: number,
    pageSize: number,
    keyword: string
  ){
    try {
      const users = await this.prismaService.nguoiDung.findMany({
        where: keyword
            ? {
                name: {
                    contains: keyword
                }
            }
            : {},
        skip: (pageIndex - 1) * pageSize,
        take: pageSize
    });
    return users.map(user => plainToClass(CreateNguoidungDto, user));
    } catch (error) {
      throw new Error('Failed to fetch users')
    }
  }

  async create(createNguoidungDto: CreateNguoidungDto) {
    try {
      const existUser = await this.prismaService.nguoiDung.findFirst({
        where:{email: createNguoidungDto.email}
      })
      if(existUser){
        throw new ConflictException('User is existed')
      }
      const hashPassword = bcrypt.hashSync(createNguoidungDto.pass_word,10)
      const newData ={
        name:createNguoidungDto.name,
        email:createNguoidungDto.email,
        pass_word:hashPassword,
        phone:createNguoidungDto.phone,
        birth_day: createNguoidungDto.birth_day,
        gender:createNguoidungDto.gender,
        role:createNguoidungDto.role,
        avatar:createNguoidungDto.avatar
      }
      return await this.prismaService.nguoiDung.create({data:newData})
    } catch (error) {
      if(error instanceof ConflictException){
        throw error;
      }
      throw new InternalServerErrorException(`Failed to create User ${error.message}`)
    }
  }

  async findAll() {
    let data = await this.prismaService.nguoiDung.findMany()
    return data;
  }

  async findOne(id: number) {
    let data = await this.prismaService.nguoiDung.findMany({
      where:{
        id,
      }
    })
    return data;
  }

  async searchByName(name: string) {
    const nguoidung = await this.prismaService.nguoiDung.findFirst({
      where:{name}
    })
    if(!nguoidung){
      throw new NotFoundException('Name not found')
    }
    return await this.prismaService.nguoiDung.findMany({
      where:{
        name,
      }
    })
  }

  async update(id: number, updateNguoidungDto: UpdateNguoidungDto) {
    try {
      const user = await this.prismaService.nguoiDung.findUnique({
        where:{id}
      })
      if(!user){
        throw new NotFoundException("User not found")
      }
      const existEmail = await this.prismaService.nguoiDung.findFirst({
        where:{email: updateNguoidungDto.email}
      })
      if(existEmail){
        throw new ConflictException('Email is existed')
      }
      const updatedUser = await this.prismaService.nguoiDung.update({
        where: {id}, 
        data: updateNguoidungDto,
      })
      return updatedUser;
    } catch (error) {
      if(error instanceof NotFoundException){
        throw error;
      }
      throw new InternalServerErrorException(`Failed to update user: ${error.message}`)
    }
  }

  async remove(id: number){
    try{
      const user = await this.prismaService.nguoiDung.findUnique({
        where:{id}
      })
      if(!user){
        throw new NotFoundException("User not found")
      }
    await this.prismaService.nguoiDung.delete({
      where:{id}
    })
  }catch(error){
    if(error instanceof NotFoundException){
      throw error;
    }
    throw new InternalServerErrorException(`Failed to delete user: ${error.message}`)
  }
  }
}
