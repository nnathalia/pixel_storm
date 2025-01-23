/* eslint-disable prettier/prettier */
import { Injectable, NestMiddleware } from '@nestjs/common';
import * as methodOverride from 'method-override';

@Injectable()
export class MethodOverrideMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    methodOverride('_method')(req, res, next);
  }
}
