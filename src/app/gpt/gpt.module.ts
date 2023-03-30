import { Module } from '@nestjs/common';
import { GptGateway } from './gpt.gateway';

@Module({
  providers: [GptGateway]
})
export class GptModule {}
