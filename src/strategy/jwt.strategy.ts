import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
 constructor(config: ConfigService) {
 super({
 jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
 ignoreExpiration: false,
 secretOrKey:"SECRET_KEY",
 });
 }
 async validate(payload: any) {
 return payload;
 }
}