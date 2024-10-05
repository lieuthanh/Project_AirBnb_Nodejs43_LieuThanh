import { Injectable } from '@nestjs/common';
import { LoginDto, SignUpDto } from './dto/create-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { GenderRole, UserRole } from 'src/nguoidung/dto/create-nguoidung.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prismaService: PrismaService
    ){}

  async signUp(userSignUp: SignUpDto){ 
    const {name,email,pass_word, phone, birth_day, role,gender, avatar} = userSignUp;
    const checkEmail = await this.prismaService.nguoiDung.findFirst({
      where:{
        email,
      },
    });
    if(checkEmail){
      return "Email existed!"
    }
    const hashPassword = await bcrypt.hash(pass_word,10);
    const newUser ={
      name,
      email,
      pass_word: hashPassword,
      phone,
      birth_day,
      gender:userSignUp.gender,
      role:userSignUp.role,
      avatar,
    };
    await this.prismaService.nguoiDung.create({
      data: newUser,
    });
    return "Sign Up Successfully!"
  }

  async login(userLogin: LoginDto){
    const {email, pass_word} = userLogin;
    const checkEmail = await this.prismaService.nguoiDung.findFirst({
      where:{
        email,
      },
    });
    if(checkEmail){
      if(bcrypt.compareSync(pass_word,checkEmail.pass_word)){
        let userId = {id: checkEmail.id}
        let user = checkEmail
        let token = this.jwtService.sign(userId,{ algorithm: "HS256", expiresIn:"30d", secret: "SECRET_KEY"})
        return {token,user}
      }
      else{
        return "Password incorect!"
      }
    }else{
      return "Email incorect!"
    }
  }
}
