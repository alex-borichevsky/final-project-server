import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

// =========== Services =======================
import { AuthService } from 'src/app/auth/auth.service';

// =========== DTOs =======================
import { Payload } from 'src/app/auth/dtos/payload.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private authService: AuthService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: "SECRET",
    });
  }
  async validate(payload: Payload)
  {return await this.authService.validateUser(payload)}

}


