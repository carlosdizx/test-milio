import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { Repository } from 'typeorm';
import User from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { parse } from 'csv-parse';
import { S3Service } from './s3.service';

@Injectable()
export class UsersCrudService {
  constructor(
    @InjectRepository(User) private readonly repository: Repository<User>,
    private readonly s3Client: S3Service,
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

  public uploadDataFromS3 = async (key: string) => {
    const { Body } = await this.s3Client.getFileContent(key);

    const dataString = await Body.transformToString('utf8');
    return new Promise<object>((resolve, reject) => {
      parse(dataString, { columns: true }, async (error, usersS3) => {
        if (error) {
          reject(error);
        } else {
          const generateRandomString = () => {
            return Math.floor(Math.random() * Date.now()).toString(36);
          };
          const userLoads: any[] = [];
          for (const userS3 of usersS3) {
            const user = await this.create({
              email: `${userS3.user}-${generateRandomString()}@mail.com`,
              password: `${generateRandomString()}-${generateRandomString()}`,
            });
            userLoads.push(user);
          }
          const response = { message: 'Users created', users: userLoads };
          resolve(response);
        }
      });
    });
  };
}
