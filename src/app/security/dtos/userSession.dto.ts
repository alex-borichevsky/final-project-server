import { IsNumber, IsString, IsUUID } from "class-validator";
import { UUIDDto } from '../../../shared/dtos/uuid.dto';


export class UserSessionDto{
  @IsUUID()
  id: string;

  @IsString()
  email: string;

  @IsNumber()
  roleId: number;

  public static fromPayload(dto: UserSessionDto): UserSessionDto {
    if (!dto) {
      return;
    }

    return {
      id: dto.id,
      email: dto.email,
      roleId: dto.roleId,
    };
  }
}