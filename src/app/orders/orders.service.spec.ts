import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { I18nService } from 'nestjs-i18n';
import { DeleteResult, Repository } from 'typeorm';
import { CartRepo } from '../cart/repos/cart.repo';
import { UserRoleTypes } from '../roles/enums/user-role-types.enum';
import { JwtPermissionsGuard } from '../security/guards/jwt-permissions.guard';
import { UserEntity } from '../users/entities/users.entity';
import { OrdersEntity } from './entities/orders.entity';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { OrdersRepo } from './repos/orders.repo';


describe('OrdersService', () => {
  let ordersService: OrdersService;
  let i18n: I18nService;
  let ordersRepo: OrdersRepo;
  let cartRepo: CartRepo

  const mockI18nService = {

  }

  const mockPermissionGuard = {}

  const mockOrdersRepo = {}

  const mockCartRepo = {}

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrdersService, I18nService, OrdersRepo, CartRepo],
    })
      .overrideProvider(CartRepo).useValue(mockCartRepo)
      .overrideProvider(OrdersRepo).useValue(mockOrdersRepo)
      .overrideProvider(I18nService).useValue(mockI18nService)
      .overrideGuard(JwtPermissionsGuard).useValue(mockPermissionGuard)
      .compile();

    i18n = module.get<I18nService>(I18nService);
    ordersService = module.get<OrdersService>(OrdersService);
    ordersRepo = module.get<OrdersRepo>(OrdersRepo)
    cartRepo = module.get<CartRepo>(CartRepo)
    // repository = module.get(getRepositoryToken(OrdersEntity));
  });


  it('should be defined', () => {
    expect(ordersService).toBeDefined();
  });

  describe('orders service functions', () => {
    it('should return orders', async () => {
      ordersRepo.getAllOrders = jest.fn().mockResolvedValue([{
        id: "aaa",
        totalPrice: 532,
        userId: "fasdf"
      }])
      expect(await ordersService.getOrders()).toEqual([{
        id: "aaa",
        totalPrice: 532,
        userId: "fasdf"
      }])
    })

    it('should return order by id', async () => {
      ordersRepo.getOrderById = jest.fn().mockResolvedValue([{
        id: "aaa",
        totalPrice: 532,
        userId: "fasdf"
      }])
      expect(await ordersService.getOrderById("aaa")).toEqual([{
        id: "aaa",
        totalPrice: 532,
        userId: "fasdf"
      }])
    })

    it('should create order', async () => {
      const userCart = [{
        id: "sdgfajipagr",
        email: "test",
        password: "test",
        roleId: 1,
        status: true,
        roleType: UserRoleTypes.Client,
        created: new Date(),
        updated: new Date()
      }]
      cartRepo.getCartByUserId = jest.fn().mockResolvedValue(userCart)
      ordersRepo.create = jest.fn().mockResolvedValue({
        id: "aaa",
        totalPrice: 532,
        userId: "fasdf"
      })
      ordersRepo.save = jest.fn().mockResolvedValue({
        id: "aaa",
        totalPrice: 532,
        userId: "fasdf"
      })
      expect(await ordersService.createOrder({
        id: 'test',
        email: 'test',
        roleId: 1
      },{totalPrice: 10})).toEqual({
        id: "aaa",
        totalPrice: 532,
        userId: "fasdf"
      })
    })
    it('should return error invalid id', async () => {
      cartRepo.getCartById = jest.fn().mockResolvedValue(null)
      i18n.t = jest.fn().mockResolvedValue('Invalid user id')
      try {
        await ordersService.createOrder({
          id: 'test',
          email: 'test',
          roleId: 1
        },{totalPrice: 10});
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    })
    it('should delete order', async()=>{
      ordersRepo.delete = jest.fn().mockResolvedValue('deleted')
      expect(await ordersService.deleteOrder('aaa')).toEqual('deleted')
    })
  }

  )
});