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
  async create({ email, password }: CreateUserDto) {
    const userFound = await this.findByEmail(email);
    if (userFound) throw new BadRequestException('User already exists');
    const user = this.repository.create({
      email,
      password,
    });
    return this.repository.save(user);
  }

  async findAll() {
    return this.repository.find();
  }

  async findOne(id: string) {
    return this.repository.findOne({ where: { id } });
  }

  async findByEmail(email: string) {
    return this.repository.findOne({ where: { email } });
  }

  async update(id: string, { password }: UpdateUserDto) {
    const user = await this.findOne(id);
    if (!user) throw new NotFoundException('User not found');
    user.password = password;
    return this.repository.save(user);
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    if (!user) throw new NotFoundException('User not found');
    await user.remove();
    return { message: 'User removed' };
  }
}
