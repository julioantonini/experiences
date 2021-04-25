import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  getHello(): string {
    return '<center>Api is on!<br/>For documentation click <a title="documentation" href="/api">here</a></center>';
  }
}
