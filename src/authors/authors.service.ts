import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from './entities/author.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthorsService {


  constructor(
    @InjectRepository(Author)
    private authorsRepository: Repository<Author>
  ){}

  async create(createAuthorDto: CreateAuthorDto): Promise<Author> {
    const author = this.authorsRepository.create(createAuthorDto);
    return await this.authorsRepository.save(author);
  }

  findAll() {
    return this.authorsRepository.find();
  }

  async findOne(id: number) {
    const author = await this.authorsRepository.findOne({
      where: { id}
    })
    if( author){
      return author;
    }else{
      throw new NotFoundException(`El autor con el ID: ${id} no existe`)
    }
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto) {
    const author = await this.authorsRepository.findOne({
      where: { id}
    })

    if(!author){
      throw new NotFoundException(`El autor con el ID: ${id} no existe`)
    }

    if(updateAuthorDto.name != null){
      author.name = updateAuthorDto.name;
    }

    if(updateAuthorDto.nationality != null){
      author.nationality = updateAuthorDto.nationality;
    }

    if(updateAuthorDto.birthDate != null){
      author.birthDate = updateAuthorDto.birthDate;
    }

    return this.authorsRepository.save(author);

  }

  async remove(id: number) {
    const author = await this.authorsRepository.findOne({
      where: { id}
    })

    if(!author){
      throw new NotFoundException(`El autor con el ID: ${id} no existe`)
    }

    return this.authorsRepository.delete(author);
  }
}
