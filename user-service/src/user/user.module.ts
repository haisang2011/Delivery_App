import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { RedisModule } from "nestjs-redis";
import { EmailModule } from "src/email/email.module";
import { User, UserSchema } from './schema/user.schema';
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), EmailModule],
  controllers: [UserController],
  providers: [UserService],
})

export class UserModule {}