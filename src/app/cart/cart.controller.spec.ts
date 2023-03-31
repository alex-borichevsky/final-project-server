import { Test, TestingModule } from '@nestjs/testing';

// =========== Entities =======================
import { ProductsEntity } from '../products/entities/products.entity';
import { UserEntity } from '../users/entities/users.entity';
import { CartEntity } from './entities/cart.entity';

// =========== DTOs =======================
import { UserSessionDto } from '../security/dtos/userSession.dto';

// =========== Enums =======================
import { UserRoleTypes } from '../roles/enums/user-role-types.enum';

// =========== Guards =======================
import { JwtPermissionsGuard } from '../security/guards/jwt-permissions.guard';

// =========== Controllers =======================
import { CartController } from './cart.controller';

// =========== Services =======================
import { CartService } from './cart.service';

describe('CartController', () => {
    let cartController: CartController;
    let cartService: CartService;

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

    const mockPermissionGuard = {}

    const mockCartService = {
        getCarts: jest.fn(() => {
            return {
                quantity: 1,
                productId: "fsafasd",
                userId: "afasfwa"
            }
        }),

        getCartById: jest.fn(() => {
            return {
                quantity: 1,
                productId: "fsafasd",
                userId: "afasfwa"
            }
        }),

        addProductToCart: jest.fn((dto) => {
            return {
                ...dto,

            }
        }),

        deleteProductFromCart: jest.fn(()=>{
            return null
        }),

        updateProductQuantity: jest.fn((dto) => {
            return {
                ...dto,
            }
        }),
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [CartController],
            providers: [CartService],
        }).overrideProvider(CartService).useValue(mockCartService)
            .overrideGuard(JwtPermissionsGuard).useValue(mockPermissionGuard)
            .compile();

        cartService = module.get<CartService>(CartService);
        cartController = module.get<CartController>(CartController);
    });

    it('should be defined', () => {
        expect(cartController).toBeDefined();
    });

    it('should return cart list', () => {
        expect(cartController.getCarts())
            .toEqual({
                quantity: 1,
                productId: "fsafasd",
                userId: "afasfwa"
            })
    });

    it('should return cart by id', async () => {
        cartService.getCartByUserId = jest.fn().mockResolvedValue(cart)
        expect(await cartController.getCartByUserId({
            id: 'test',
            email: 'test',
            roleId: 1
        }))
            .toEqual(cart)
    });

    it('should add product to cart', async () => {
        cartService.addProductToCart = jest.fn().mockResolvedValue(cart)
        expect(await cartController.addProductToCart({
            id: 'test',
            email: 'test',
            roleId: 1
        },{
            productId: "test",
            quantity: 1,
        }))
            .toEqual(cart)
    });

    it('should delete product from cart', async () => {
        cartService.deleteProductFromCart = jest.fn().mockResolvedValue(cart)
        expect(await cartController.deleteProductFromCart("prod1"))
            .toEqual(cart)
    });

    it('should update product in cart', async () => {
        cartService.updateProductQuantity = jest.fn().mockResolvedValue(
            {
                recordId: "prod1",
                quantity: 5,
            }
        )
        expect(await cartController.updateProductQuantity({
            recordId: "prod1",
            quantity: 5,
        }))
            .toEqual({
                recordId: "prod1",
                quantity: 5,
            })
    });
});