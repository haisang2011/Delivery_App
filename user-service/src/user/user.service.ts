import { Model } from 'mongoose';
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./schema/user.schema";
import { CreateUserDto } from './dto';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly emailService: EmailService,
  ) {}
  
  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const createdUser = new this.userModel(createUserDto);
      const token = Math.floor(1000 + Math.random() * 9000).toString();
      await this.emailService.sendUserWelcome(createdUser, token);
      return createdUser.save();
    } catch (error) {
    }
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
}