import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';
import { Author } from 'src/authors/entities/author.entity';

@Injectable()
export class BooksService {

  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
    @InjectRepository(Author)
    private authorRepository: Repository<Author>
  ){}

  private async findOneOrFail(id: number, relations = false): Promise<Book>{
    const book = await this.bookRepository.findOne({
      where: { id},
      relations: {
        author: relations ? true : false
      },
      select: {
        author: {
          id: true,
          name: true
        }
      }
    });

    if(!book){
      throw new NotFoundException(`El libro con el Id ${id} no existe`);
    }
    return book;
  }

  async create(createBookDto: CreateBookDto): Promise<Book>{
    // const author = this.authorsRepository.create(createAuthorDto);
    // return await this.authorsRepository.save(author);

    const author = await this.authorRepository.exists({
      where: {
        id: createBookDto.authorId
      }
    });
    if(!author){
      throw new ConflictException('El autor no existe');
    }
    return this.bookRepository.save(createBookDto);
  }

  async findAll(relations = false){
    const [data] = await this.bookRepository.findAndCount({
      select: {
        id: true,
        title: true,
        isbn: true,
        publisher: true,
        publicationYear: true,
        genre: true,
        author: {
          id: true,
          name: true
        }
      },
      relations: {
        author: relations ? true : false
      }
    })
    return data;
  }

  async findOne(id: number, relations: boolean): Promise<Book> {
    return this.findOneOrFail(id, relations);
  }

  async update(id: number, updateBookDto: UpdateBookDto): Promise<Book> {
    const book = await this.findOneOrFail(id);

    if( updateBookDto.title != null){
      book.title = updateBookDto.title;
    }

    if( updateBookDto.publisher != null){
      book.publisher = updateBookDto.publisher;
    }

    if( updateBookDto.isbn != null){
      book.isbn = updateBookDto.isbn;
    }

    if( updateBookDto.publicationYear != null){
      book.publicationYear = updateBookDto.publicationYear;
    }

    if( updateBookDto.genre != null){
      book.genre = updateBookDto.genre;
    }

    if( updateBookDto.authorId != null){
      const author = await this.authorRepository.exists({
        where: {
          id: updateBookDto.authorId
        }
      });
      if(!author){
        throw new ConflictException('El Autor no existe');
      }
      book.authorId = updateBookDto.authorId;
    }

    return this.bookRepository.save(book);
  }

  async remove(id: number) {
    const book = await this.findOneOrFail(id);
    return this.bookRepository.delete(id);
  }

  async findAuthor(id: number): Promise<Author>{
    const book = await this.findOneOrFail(id, true);
    return book.author;
  }
}
