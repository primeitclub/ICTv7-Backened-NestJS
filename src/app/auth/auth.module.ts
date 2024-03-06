import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './strategy/google.strategy';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/model/User.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwt } from 'src/config/env';
import { JwtStratgegy } from './strategy/jwt.strategy';
import { MailService } from 'src/mail/mail.service';
import { OTP } from '../user/model/Otp.entity';
import { UserTry } from '../user/model/newUser.entitytry';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, OTP]),
    TypeOrmModule.forFeature([UserTry], 'tryDB'),
    JwtModule.register({
      secret: jwt.atSecretKey,
      signOptions: {
        expiresIn: jwt.expiresIn
      }
    })
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    MailService,
    JwtStratgegy,
    GoogleStrategy
  ]
})
export class AuthModule {}
