import { SetMetadata } from "@nestjs/common";

// ============ Enums ================
import { UserPermissions } from "src/app/roles/enums/user-permissions.enum";

export const PERMISSION_KEY = 'permissions';

export const RequirePermissions = (...permissions: UserPermissions[]) => SetMetadata(PERMISSION_KEY, permissions);