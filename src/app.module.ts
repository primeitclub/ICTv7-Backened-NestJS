import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { tryNewTypeOrmConfigs, typeOrmConfigs } from './config/db.config';
import { EsportsModule } from './app/esports/esports.module';
import { GalleryModule } from './app/gallery/gallery.module';
import { EventsModule } from './app/events/events.module';
import { UserModule } from './app/user/user.module';
import { AuthModule } from './app/auth/auth.module';
import { MailModule } from './mail/mail.module';
import { TeamMemberModule } from './app/team-member/team-member.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './app/auth/jwt.guard';
import { FileUploadModule } from './app/file-upload/file-upload.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfigs()),
    TypeOrmModule.forRoot(tryNewTypeOrmConfigs()),

    AuthModule,
    EventsModule,
    UserModule,
    EsportsModule,
    GalleryModule,
    MailModule,
    TeamMemberModule,
    FileUploadModule
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: JwtAuthGuard }]
})
export class AppModule {}
