import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NguoidungModule } from './nguoidung/nguoidung.module';
import { AuthModule } from './auth/auth.module';
import { DatphongModule } from './datphong/datphong.module';
import { BinhluanModule } from './binhluan/binhluan.module';
import { VitriModule } from './vitri/vitri.module';
import { PhongModule } from './phong/phong.module';
import { JwtStrategy } from './strategy/jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [NguoidungModule, PhongModule, VitriModule, BinhluanModule, DatphongModule, AuthModule, ConfigModule.forRoot({isGlobal:true}),JwtModule.register({global: true})],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
