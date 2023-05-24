import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { environments } from './config';
import { UserModule } from './user/user.module';
import { EmailModule } from './email/email.module';
import { CacheModule } from '@nestjs/cache-manager';

console.log("==> App: ", { environments });

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://${environments.dbHost}/${environments.dbName}`),
    CacheModule.register({ isGlobal: true, ttl: 0 }),
    UserModule,
    EmailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
