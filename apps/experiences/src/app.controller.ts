import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('Home')
export class AppController {
  constructor() {}

  @Get()
  getHello(): string {
    return '<center>Api is on!<br/>For documentation click <a title="documentation" href="/api">here</a></center>';
  }
}
