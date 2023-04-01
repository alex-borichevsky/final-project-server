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
  UpdateUserStatus = "update-user-status",

  // ============== users info ==========
  GetUserInfo = "get-user-info",
  UpdateUserInfo = "update-user-info",

  // ============= categories ===========
  GetAllCategories = 'get-all-categories',
  GetCategoryById = 'get-category-by-id',
  CreateCategory = 'create-category',
  UpdateCategory = 'update-category',
  DeleteCategory = 'delete-category',

  // ============== roles ==========
  GetRoles = "get-roles",
  GetRoleById = "get-role-by-id",
  CreateRole = "create-role",
  AssignRole = "assign-role",
  DeleteRole = "delete-role",
  UpdateRole = "update-role",

  // ============== cart ==========
  GetCart = 'get-cart',
  GetCartById = 'get-cart-by-id',
  AddProductToCart = 'add-product-to-cart',
  DeleteProductFromCart = 'delete-product-from-cart',
  UpdateProductQuantity = 'update-product-quantity',
  GetCartByUserId = 'get-cart-by-user-id',
  DeleteCartByUserId = 'delete-cart-by-user-id',

  // ============== orders ==========
  GetOrders = 'get-orders',
  GetOrderById = 'get-order-by-id',
  CreateOrder = 'create-order',
  DeleteOrder = 'delete-order',
  GetOrderByUserId = 'get-order-by-user-id',

  // ============== products ==========
  CreateProduct = 'create-product',
  GetProductById = 'get-product-by-id',
  GetAllProducts = 'get-all-products',
  DeleteProduct = 'delete-product',
  UpdateProduct = 'update-product',
}