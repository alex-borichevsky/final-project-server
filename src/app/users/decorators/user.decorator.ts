import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// ============ DTOs ================
import { UserSessionDto } from '../../security/dtos/userSession.dto';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    if (!request.user) return null;
    return UserSessionDto.fromPayload(request.user);

  }
);