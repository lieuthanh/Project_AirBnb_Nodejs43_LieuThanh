import { Controller, Post, Body, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, SignUpDto } from './dto/create-auth.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Auth")
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/sign-up")
   signUp(@Body() body: SignUpDto){
    return this.authService.signUp(body)
  }

  @Post("/login")
   login(@Body() body: LoginDto, @Headers("token") header){
    return this.authService.login(body)
  }

}