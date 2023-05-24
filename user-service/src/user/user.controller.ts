import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { BadRequestException, Body, Controller, Get, HttpException, HttpStatus, Inject, Post, Res } from "@nestjs/common";
import { Cache } from "cache-manager";
import { Response } from "express";
import { CreateUserDto } from "./dto";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
  constructor(
    private readonly userService: UserService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache
  ) {}

  @Get()
  async getAllUser(@Res() res: Response) {
    try {

      const value = await this.cacheManager.get('all-user');
      if (value) {
        return res.status(HttpStatus.OK).json(value);
      }

      const users = await this.userService.findAll();
      await this.cacheManager.set('all-user', users);
      return res.status(HttpStatus.OK).json(users);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  async createUser(
    @Res() res: Response,
    @Body() body: CreateUserDto
  ) {
    try {
      const createdUser = await this.userService.create(body);
      return res.status(HttpStatus.OK).json(createdUser);
    } catch (error) {
      throw new BadRequestException();
    }
  }
}