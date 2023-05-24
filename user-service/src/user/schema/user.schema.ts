import { Prop, Schema as MongooseSchema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@MongooseSchema({ timestamps: true })
export class User {
  _id: Schema.Types.ObjectId;

  @Prop({ name: "email", unique: true })
  email: string;

  @Prop({ name: "user_name", unique: true })
  userName: string;

  @Prop({ name: "first_name" })
  firstName: string;

  @Prop({ name: "last_name" })
  lastName: string;

  @Prop()
  avatar: string;

  @Prop({ default: Date.now })
  createdAt?: Date
}

export const UserSchema = SchemaFactory.createForClass(User);