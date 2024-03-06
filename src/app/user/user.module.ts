import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './model/User.entity';
import { OTP } from './model/Otp.entity';
import { UserTry } from './model/newUser.entitytry';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, OTP]),
    TypeOrmModule.forFeature([UserTry], 'tryDB')
  ],

  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
