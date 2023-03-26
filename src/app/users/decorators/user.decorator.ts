import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserSessionDto } from '../../security/dtos/userSession.dto';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    console.log(request)
    if (!request.user) return null;
    return UserSessionDto.fromPayload(request.user);

  }
);