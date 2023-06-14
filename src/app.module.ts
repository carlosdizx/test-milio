import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_DATABASE;

console.log(host, port, username, password, database);
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host,
      port: Number(port),
      username,
      password,
      database,
      entities: [__dirname + '/entities/*.entity{.ts,.js}'],
      // migrations: [__dirname + '/migrations/*{.ts,.js}'],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
