import { Injectable } from '@nestjs/common';
import { LoggerService } from './common/logger';

@Injectable()
export class AppService {
  constructor(private logger: LoggerService) {
    this.logger.setContext(AppService.name);
  }

  getHello(): string {
    return 'Hello World!';
  }
}
