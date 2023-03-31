import { Module } from '@nestjs/common';

// ============ Gateway ================
import { GptGateway } from './gpt.gateway';

@Module({
  providers: [GptGateway]
})
export class GptModule {}
