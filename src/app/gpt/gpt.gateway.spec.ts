import { Test, TestingModule } from '@nestjs/testing';

// ============ Gateway ================
import { GptGateway } from './gpt.gateway';

describe('GptGateway', () => {
  let gateway: GptGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GptGateway],
    }).compile();

    gateway = module.get<GptGateway>(GptGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
