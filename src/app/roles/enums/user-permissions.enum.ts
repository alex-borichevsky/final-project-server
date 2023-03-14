export enum UserPermissions {
  All = 'all',
  RefreshToken = 'refresh-token',
  SignOut = 'sign-out',

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

  // ============= categories ===========
  GetAllCategories = 'get-all-categories',
  GetCategoryById = 'get-category-by-id',
  CreateCategory = 'create-category',
  UpdateCategory = 'update-category',
  DeleteCategory = 'delete-category'
}