import { Injectable } from '@nestjs/common';

import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'changeme',
    });
    
  }

  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email };
  }
}

/* 

Issue Reportada: Jwt está impedindo o frontendin' de ser atualizado!

ex: após o usuário logar com seu email e senha (criptografada pelo bycript no auth.service.ts); 

se ele mudar pra outra aba, ele é deslogado!!

*/