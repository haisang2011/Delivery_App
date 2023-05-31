import { Injectable } from '@nestjs/common';
import { ClientOptions, ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';

const clientOptions : ClientOptions = {
  transport: Transport.REDIS,
  options: {
    host: 'localhost',
    port: 6379,
    retryAttempts : 5,
    retryDelay : 5000
  },
}

@Injectable()
export class ProductService {
  private readonly client: ClientProxy;
  
  constructor() {
    this.client = ClientProxyFactory.create(clientOptions);
  }

  getProduct(productName: string) {
    console.log('Go to -', productName);
    return this.client.send('get_product', productName);
  }
}
