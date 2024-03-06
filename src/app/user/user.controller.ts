import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  UseGuards
} from '@nestjs/common';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';
import { addUsersDTO, updateUsersDTO } from './user.dto';
import { IsPublic } from 'src/utils/decorator';

@ApiBearerAuth()
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @IsPublic()
  @Get('all-users')
  async handleGetAllUsers(@Req() req) {
    const users = await this.userService.getAllUsers();
    return {
      statusCode: HttpStatus.OK,
      message: 'List of all users',
      users
    };
  }

  @Get('profile')
  async handleGetProfile(@Req() req) {
    const user = req.user;
    return {
      statusCode: HttpStatus.OK,
      message: 'User details fetched successfully.',
      user
    };
  }

  @Post('create')
  async handleAddUser(@Body() request: addUsersDTO) {
    return this.userService.addUser(request);
  }

  @Put('update/:id')
  async handleUpdate(@Param('id') id: number, @Body() request: updateUsersDTO) {
    return this.userService.updateUser(id, request);
  }

  @Delete('delete/:id')
  async handleDelete(@Param('id') id: number) {
    return this.userService.deleteUser(id);
  }

  @Get('/isAdmin')
  async handleIsAdmin(@Req() req) {
    const user = req.user;
    return {
      statusCode: HttpStatus.OK,
      message: 'User details fetched successfully.',
      userType: user.user_type
    };
  }
}
