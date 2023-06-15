import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import User from '../../domain/entities/user.entity';
import { Mig1686863742986 } from '../../infrastructure/migrations/1686863742986-mig';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_DATABASE'),
  entities: [User],
  migrations: [Mig1686863742986],
});
