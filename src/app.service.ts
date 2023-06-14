import { Injectable } from '@nestjs/common';
import User from './entities/user.entity';

@Injectable()
export class AppService {
  getHello(): object {
    const user = new User();
    user.email = 'carlosbiche@gmai.com';
    return user;
  }
}
