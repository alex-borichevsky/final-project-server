import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CartService } from './cart.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { AbadonedCartEvent } from './events/abadoned-cart.event';

@Injectable()
export class ScheduledTasksService {

  constructor(
    private eventEmitter: EventEmitter2,
    private cartService: CartService) {
  }

  private readonly logger = new Logger(ScheduledTasksService.name);

  @Cron(CronExpression.EVERY_30_SECONDS)
  async handleCron() {
    const carts = await this.cartService.getCarts();
    if (carts) {
      carts.forEach(cart => {
        const abadonedCartEvent= new AbadonedCartEvent();
        abadonedCartEvent.email = cart.user.email;
        abadonedCartEvent.description = `User with email: ${cart.user.email} abadoned cart`;
        this.eventEmitter.emit('abadoned.cart', abadonedCartEvent);
      })
    }
  }
}