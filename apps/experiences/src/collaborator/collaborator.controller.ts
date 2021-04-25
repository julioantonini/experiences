import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { CollaboratorService } from './collaborator.service';
import { CollaboratorDto } from './dto/collaborator.dto';

@Controller('collaborator')
export class CollaboratorController {
  constructor(private readonly collaboratorService: CollaboratorService) {}

  @Post()
  @ApiBody({ type: CollaboratorDto })
  create(@Body() collaboratorDto: CollaboratorDto) {
    return this.collaboratorService.create(collaboratorDto);
  }

  @Get()
  findAll() {
    return this.collaboratorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.collaboratorService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() collaboratorDto: CollaboratorDto) {
    return this.collaboratorService.update(+id, collaboratorDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.collaboratorService.delete(+id);
  }
}
