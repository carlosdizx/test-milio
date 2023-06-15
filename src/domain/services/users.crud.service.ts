import {
  BadRequestException,
  NotFoundException,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { Repository } from 'typeorm';
import User from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersCrudService {
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
    const user = await this.repository.findOneBy({ id });
    if (user) return user;
    throw new NotFoundException('User not found');
  };

  public findByEmail = async (email: string) => {
    return this.repository.findOneBy({ email });
  };

  public update = async (id: string, { password }: UpdateUserDto) => {
    const user = await this.findOne(id);
    if (!user) throw new NotFoundException('User not found');
    return this.repository.save({ ...user, password });
  };

  public remove = async (id: string) => {
    const user = await this.findOne(id);
    if (!user) throw new NotFoundException('User not found');
    await this.repository.remove(user);
    return { message: 'User removed' };
  };
}
