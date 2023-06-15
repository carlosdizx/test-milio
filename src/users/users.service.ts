import {
  BadRequestException,
  NotFoundException,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import User from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly repository: Repository<User>,
  ) {}
  public create = async ({ email, password }: CreateUserDto) => {
    const userFound = await this.findByEmail(email);
    if (userFound) throw new BadRequestException('User already exists');
    const user = this.repository.create({
      email,
      password,
    });
    return this.repository.save(user);
  };

  public findAll = async () => {
    return this.repository.find();
  };

  public findOne = async (id: string) => {
    return this.repository.findOneBy({ id });
  };

  public findByEmail = async (email: string) => {
    return this.repository.findOneBy({ email });
  };

  public update = async (id: string, { password }: UpdateUserDto) => {
    const user = await this.findOne(id);
    if (!user) throw new NotFoundException('User not found');
    user.password = password;
    return this.repository.save(user);
  };

  public remove = async (id: string) => {
    const user = await this.findOne(id);
    if (!user) throw new NotFoundException('User not found');
    await user.remove();
    return { message: 'User removed' };
  };
}
