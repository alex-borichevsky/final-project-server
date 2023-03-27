import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { AbadonedCartEvent } from '../events/abadoned-cart.event';
import { ScheduledTasksService } from '../scheduled-tasks.service';

@Injectable()
export class AbadonedCartListener {
  private readonly logger = new Logger(ScheduledTasksService.name);

  @OnEvent('abadoned.cart')
  handleAbadonedCartEvent(event: AbadonedCartEvent) {
    this.logger.debug(event.description);
  }
}