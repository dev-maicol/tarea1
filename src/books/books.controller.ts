import { Controller, Get, Post, Body, Patch, Param, Delete, Query, DefaultValuePipe, ParseBoolPipe, HttpCode, Request } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiBearerAuth('access-token')
@Controller('v1/books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @ApiOperation({ summary: 'Registro de Libros'})
  @Post()
  create(@Body() createBookDto: CreateBookDto, @Request() request) {
    const userId = request.user.id;
    // return this.authorsService.create({ ...createAuthorDto, userId });
    return this.booksService.create({ ...createBookDto, userId });
  }

  @ApiOperation({ summary: 'Obtener lista de Libros'})
  @Get()
  findAll(
    @Query('relations', new DefaultValuePipe(false), ParseBoolPipe) relations: boolean
  ) {
    return this.booksService.findAll(relations);
  }

  @ApiOperation({ summary: 'Obtener Libro por ID'})
  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Query('relations', new DefaultValuePipe(false), ParseBoolPipe) relations: boolean
  ) {
    return this.booksService.findOne(+id, relations);
  }

  @ApiOperation({ summary: 'Actualizar Libro por ID'})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(+id, updateBookDto);
  }

  @ApiOperation({ summary: 'Eliminar Libro por ID'})
  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.booksService.remove(+id);
  }

  @ApiOperation({ summary: 'Obtener Autor de un Libro por ID'})
  @Get(':id/author')
  findAuthor(@Param('id') id: number) {
    return this.booksService.findAuthor(id);
  }
}
