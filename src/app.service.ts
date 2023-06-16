import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): object {
    return {
      message: 'Hello World!',
      author: 'Carlos Ernesto Díaz Basante',
      github: 'https://github.com/carlosdizx',
      linkedIn: 'https://www.linkedin.com/in/carlos-ernesto-diaz-basante',
    };
  }
}
