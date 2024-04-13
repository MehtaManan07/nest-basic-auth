import { Injectable } from '@nestjs/common';
import { LoggerService } from './common/logger';

@Injectable()
export class AppService {
  constructor(private logger: LoggerService) {
    this.logger.setContext(AppService.name);
  }

  getHello(): string {
    this.logger.log({ message: 'Hello World!', ok: [1, 2, 3, 4, 5] });
    return 'Hello World!';
  }
}
