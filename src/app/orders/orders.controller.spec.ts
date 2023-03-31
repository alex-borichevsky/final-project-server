import { Test, TestingModule } from '@nestjs/testing';

// ============ Guards ================
import { JwtPermissionsGuard } from '../security/guards/jwt-permissions.guard';

// ============ Controllers ================
import { OrdersController } from './orders.controller';

// ============ Services ================
import { OrdersService } from './orders.service';

describe('OrdersController', () => {
  let ordersController: OrdersController;
  let ordersService: OrdersService;

  const mockPermissionGuard = {
  }

  const mockOrdersService = {
    getOrders: jest.fn(() => {
      return 'test'
  }),

  getOrderById: jest.fn(() => {
      return 'test'
  }),

  createOrder: jest.fn(() => {
      return 'test'
  }),

  deleteOrder: jest.fn(() => {
      return null
  }),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
        controllers: [OrdersController],
        providers: [OrdersService],
    }).overrideProvider(OrdersService).useValue(mockOrdersService)
    .overrideGuard(JwtPermissionsGuard).useValue(mockPermissionGuard)
    .compile();

    ordersService = module.get<OrdersService>(OrdersService);
    ordersController = module.get<OrdersController>(OrdersController);
  });

  it('should be defined', () => {
    expect(ordersController).toBeDefined();
  });

  it('should get orders list', () => {
    expect(ordersController.getOrders()).toEqual("test");
  });

  it('should get orders by id', () => {
    expect(ordersController.getOrderById("test")).toEqual("test");
  });

  it('should create order', () => {
    expect(ordersController.createOrder(
      {
        id: 'test',
        email: 'test',
        roleId: 1
    },{totalPrice: 100})).toEqual("test");
  });

  it('should delete order', () => {
    expect(ordersController.deleteOrder("test")).toBeNull();
  });

});