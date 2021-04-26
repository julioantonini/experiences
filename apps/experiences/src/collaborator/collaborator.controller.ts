import { CollaboratorEntity } from '@database/database/entity';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CollaboratorService } from './collaborator.service';
import { CollaboratorDto } from './dto/collaborator.dto';

@Controller('collaborator')
@ApiTags('Collaborator')
export class CollaboratorController {
  constructor(private readonly collaboratorService: CollaboratorService) {}

  @Post()
  @ApiBody({ type: CollaboratorDto })
  create(@Body() collaboratorDto: CollaboratorDto) {
    return this.collaboratorService.create(collaboratorDto);
  }

  @Get()
  findAll(): Promise<CollaboratorEntity[]> {
    return this.collaboratorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<CollaboratorEntity> {
    return this.collaboratorService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() collaboratorDto: CollaboratorDto): Promise<CollaboratorEntity> {
    return this.collaboratorService.update(+id, collaboratorDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.collaboratorService.delete(+id);
  }
}
