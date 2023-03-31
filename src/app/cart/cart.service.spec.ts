import { Test, TestingModule } from '@nestjs/testing';

// ============ Entities ================
import { ProductsEntity } from '../products/entities/products.entity';
import { UserEntity } from '../users/entities/users.entity';
import { CartEntity } from './entities/cart.entity';

// ============ Enums ================
import { UserRoleTypes } from '../roles/enums/user-role-types.enum';

// ============ DTOs ================
import { UserSessionDto } from '../security/dtos/userSession.dto';
import { AddProductToCartDto } from './dtos/add-product-to-cart.dto';

// ============ Guards ================
import { JwtPermissionsGuard } from '../security/guards/jwt-permissions.guard';

// ============ Services ================
import { CartService } from './cart.service';

// ============ Repos ================
import { CartRepo } from './repos/cart.repo';

describe('CartService', () => {
  let cartService: CartService;
  let cartRepo: CartRepo;

  const user: UserEntity = {
    id: "test",
    email: "test",
    password: "test",
    roleId: 1,
    status: true,
    roleType: UserRoleTypes.Client,
    created: new Date(),
    updated: new Date()
  }

  const userSession: UserSessionDto = {
    email: user.email,
    id: user.id,
    roleId: user.roleId
  }

  const product: ProductsEntity = {
    id: 'test',
    created: new Date(),
    updated: new Date(),
    name: 'test',
    price: 1,
    description: 'test',
    quantity: 1,
    image: 'test',
    brand: 'test',
    categoryId: 1
  }


  const cart: CartEntity = {
    id: 'test',
    updated: new Date(),
    created: new Date(),
    quantity: 1,
    productId: 'test',
    userId: 'test',
    products: product,
    user: user,
  }

  const addProduct: AddProductToCartDto = {
    productId: product.id,
    quantity: product.quantity,
  }




  const mockCartRepo = {

  }

  const mockPermissionGuard = {}

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CartService, CartRepo],
    })
      .overrideProvider(CartRepo).useValue(mockCartRepo)
      .overrideGuard(JwtPermissionsGuard).useValue(mockPermissionGuard)
      .compile();

    cartService = module.get<CartService>(CartService);
    cartRepo = module.get<CartRepo>(CartRepo)
  });

  it('should be defined', () => {
    expect(cartService).toBeDefined();
  });

  describe('cart service functions', () => {
    it('should return carts', async () => {
      cartRepo.getAllCarts = jest.fn().mockResolvedValue([cart])
      expect(await cartService.getCarts()).toEqual([cart])
    })

    it('should return cart by id', async () => {
      cartRepo.getCartById = jest.fn().mockResolvedValue(cart)
      expect(await cartService.getCartById('test')).toEqual(cart)
    })

    it('should add product to cart', async () => {
      cartRepo.create = jest.fn().mockResolvedValue(cart)
      cartRepo.save = jest.fn().mockResolvedValue(cart)
      expect(await cartService.addProductToCart(userSession,addProduct)).toEqual(cart)
    })

    it('should delete product from cart', async () => {
      cartRepo.delete = jest.fn().mockResolvedValue('deleted')
      expect(await cartService.deleteProductFromCart('test')).toEqual('deleted')
    })

    it('should update product quantity', async () => {
      cartRepo.update = jest.fn().mockResolvedValue('updated')
      expect(await cartService.updateProductQuantity({
        recordId: 'test',
        quantity: 4
      })).toEqual('updated')
    })
  })
});