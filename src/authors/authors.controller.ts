import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Request } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiBearerAuth('access-token')
@Controller('v1/authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @ApiOperation({ summary: 'Registro de Autor'})
  @Post()
  create(@Body() createAuthorDto: CreateAuthorDto, @Request() request) {
    const userId = request.user.id;
    return this.authorsService.create({ ...createAuthorDto, userId });
    // return this.authorsService.create(createAuthorDto);
  }

  @ApiOperation({ summary: 'Obtener lista de Autores'})
  @Get()
  findAll() {
    return this.authorsService.findAll();
  }

  @ApiOperation({ summary: 'Obtener Autor por ID'})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authorsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Actualizar Autor por ID'})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthorDto: UpdateAuthorDto) {
    return this.authorsService.update(+id, updateAuthorDto);
  }

  @ApiOperation({ summary: 'Eliminar Autor por ID'})
  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.authorsService.remove(+id);
  }
}
