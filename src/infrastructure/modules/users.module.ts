import { Module } from '@nestjs/common';
import { UsersCrudService } from '../../domain/services/users.crud.service';
import { UsersController } from '../../app/controllers/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from '../../domain/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersCrudService],
})
export class UsersModule {}
