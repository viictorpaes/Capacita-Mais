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

//token fica guardado no navegador:
const data = await response.json();

if (response.ok) {

  // salva o token
  localStorage.setItem("token", data.access_token);

  // envia o usuário para o App
  onLoginSuccess(data.user);
}

//manter login para abrir o app:
useEffect(() => {

  const token = localStorage.getItem("token");

  if (token) {
    setIsAuthenticated(true);
  }

}, []);

//enviar o token para o back: 
//NestJS pode validar o usuário com o JwtStrategy:
const token = localStorage.getItem("token");

fetch("http://localhost:3000/profile", {
  headers: {
    "Authorization": `Bearer ${token}`,
  },
});

//função de logout, quando o usuario sair:
function logout() {
  localStorage.removeItem("token");
  setIsAuthenticated(false);
}





//FLUXO:
Login
↓
backend gera JWT
↓
frontend salva token no localStorage
↓
nova aba abre
↓
React verifica token
↓
usuário continua logado
*/

/* 

Issue Reportada: Jwt está impedindo o frontendin' de ser atualizado!

ex: após o usuário logar com seu email e senha (criptografada pelo bycript no auth.service.ts); 

se ele mudar pra outra aba, ele é deslogado!!

*/