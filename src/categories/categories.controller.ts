import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiBearerAuth('access-token')
@Controller('v1/categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiOperation({ summary: 'Registro de Categorias (Admin)'})
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto, @Request() request) {
    let userRole = request.user.role;
    // convertir a minúsculas
    userRole = userRole.toLowerCase();
    console.log(userRole);
    if (userRole !== 'admin') {
      return { message: 'Unauthorized' };
    }
    return this.categoriesService.create(createCategoryDto);
  }

  @ApiOperation({ summary: 'Obtener lista de Categorias'})
  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.categoriesService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
  //   return this.categoriesService.update(+id, updateCategoryDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.categoriesService.remove(+id);
  // }
}
