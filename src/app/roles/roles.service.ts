import { Injectable } from '@nestjs/common';
import { RolesRepo } from "./repos/roles.repo";
import { CreateRoleDto } from "./dtos/create-role.dto";

@Injectable()
export class RolesService {
  constructor(
    private readonly roleRepository: RolesRepo,
  ) { }

  async getAllRoles() {
    return await this.roleRepository.getAllRoles();
  }

  async getRoleById(id : number) {
    return await this.roleRepository.getRoleById(id);
  }

  async createRole(dto: CreateRoleDto) {
    const newRole = this.roleRepository.create({
      ...dto, created: new Date()
    });

    return this.roleRepository.save(newRole);
  }

  public updateRole(updateId: number, dto: CreateRoleDto) {
    return this.roleRepository.update(updateId, { ...dto, updated: new Date()});
  }

  public deleteRole(id: number) {
    return this.roleRepository.delete(id);
  }

}
