import { Module } from '@nestjs/common';
import { UsersCrudService } from '../../domain/services/users.crud.service';
import { UsersController } from '../../app/controllers/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from '../../domain/entities/user.entity';
import { S3Service } from '../../domain/services/s3.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersCrudService, S3Service],
})
export class UsersModule {}
