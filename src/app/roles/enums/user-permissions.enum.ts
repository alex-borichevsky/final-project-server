export enum UserPermissions {
  All = 'all',
  RefreshToken = 'refresh-token',
  SignOut = 'sign-out',

  // ============== users ==========
  GetUsers = 'get-users',
  GetUserById = 'get-user-by-id',
  GetUserInfo = 'get-user-info',
  AddUser = 'add-user',
  DeleteUser = 'delete-user',
  UpdateUserInfo = 'update-user-info',

  // ============== users ==========
  GetAllCategories = 'get-all-categories',
  GetCategoryById = 'get-category-by-id',
  CreateCategory = 'create-category',
  UpdateCategory = 'update-category',
  DeleteCategory = 'delete-category'
}