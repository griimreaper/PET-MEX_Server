import { Controller, Post, Body, HttpStatus, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';



@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Registrar fundacion o usuario con authenticacion
  // Se debe recibir por json:
  //  {
  //     "email": "ejemplo@gmail.com",
  //     "password":  "12345678",
  //     "rol": "fundation" | "user"
  //  }

  @Post('register')
  async register(@Body() body :LoginDto, @Res() response: Response) {
    try {
      const resp = await this.authService.register(body);
      switch (resp.status) {
        case HttpStatus.CREATED:
          response.status(HttpStatus.CREATED).send(resp.send);
          break;
        case HttpStatus.BAD_REQUEST:
          response.status(HttpStatus.BAD_REQUEST).send(resp.send);
          break;
      }
    } catch (error) {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  }

  @Post('login')
  async loginAc(@Body() loginDto: LoginDto) {
    const user = await this.authService.validate(loginDto);
    const token = await this.authService.login(user, loginDto.rol);
    return token;
  }
  
}