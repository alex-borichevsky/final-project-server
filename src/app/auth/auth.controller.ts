import { Body } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { HttpCode } from '@nestjs/common';
import { Controller, Post } from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { RegistrationDto } from './dtos/registration.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) { }

  @ApiOperation({ summary: "Registration with email, password and confirm password" })
  @ApiBody({ type: RegistrationDto })
  @HttpCode(200)
  @Post('registration')
  registraton(@Body() user: RegistrationDto) {
    return this.authService.registration(user);
  }

  @ApiOperation({ summary: "Login with email and password" })
  @ApiBody({ type: LoginDto })
  @HttpCode(200)
  @Post('login')
  login(@Body() user: LoginDto ) {
    return this.authService.login(user);
  }

  @ApiOperation({ summary: "Logout" })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Get('logout')
  async logOut() {
    return null;
  }
}
