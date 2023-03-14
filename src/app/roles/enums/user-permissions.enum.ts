export enum UserPermissions {
  All = "all",
  RefreshToken = "refresh-token",
  SignOut = "sign-out",

  // ============== users ==========
  GetUsers = "get-users",
  GetUserById = "get-user-by-id",
  GetUserRole = "get-user-role",
  DeleteUser = "delete-user",
  UpdatePassword = "update-password",
  UpdateBanStatus = "update-ban-status",
  UpdateBanReason = "update-ban-reason",

  // ============== users info ==========
  GetUserInfo = "get-user-info",
  UpdateUserInfo = "update-user-info",

  // ============== roles ==========
  GetRoles = "get-roles",
  GetRoleById = "get-role-by-id",
  CreateRole = "create-role",
  AssignRole = "assign-role",
  DeleteRole = "delete-role",
  UpdateRole = "update-role"
}