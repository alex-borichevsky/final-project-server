import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: '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',
});
const openai = new OpenAIApi(configuration);

@WebSocketGateway({
  cors: {
    allowedOrigins: ['http://localhost:3000', 'http://localhost:5000'],
  },
})
export class GptGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  async handleConnection(client: any, ...args: any[]) {
    console.log(`Client connected: ${client.id}`);
  }

  async handleDisconnect(client: any) {
    console.log(`Client disconnected: ${client.id}`);
  }

  afterInit(server: any) {
    console.log('WebSocket server initialized');
  }

  @SubscribeMessage('message')
  async handleMessage(client: any, message: string) {
    console.log(message);

    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: message,
      max_tokens: 100,
      temperature: 0,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    const generatedText = response.data.choices[0].text;
    //  this.server.emit('message', generatedText);
    client.emit('message', generatedText);
    console.log(generatedText);
  }
}