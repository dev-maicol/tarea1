import { Author } from "src/authors/entities/author.entity";
import { Category } from "src/categories/entities/category.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";

@Entity('books')
@Unique([ 'isbn'])
export class Book {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'character varying', length: 120, nullable: false})
  title: string;

  @Column({ type: 'character varying', length: 20})
  isbn: string;

  @Column({ type: 'character varying', length: 30})
  publisher: string;

  @Column({ type: 'integer', name: 'publication_year'})
  publicationYear: number;

  @Column({ type: 'character varying', length: 30})
  genre: string;

  @CreateDateColumn({ type: 'timestamp with time zone', name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone', name: 'updated_at'})
  updatedAt: Date;

  @Column({ type: 'integer', name: 'author_id'})
  authorId: Number;

  @Column({ type: 'integer', name: 'category_id', nullable: true})
  categoryId: Number;

  @ManyToOne(() => Author, (author) => author.id)
  @JoinColumn([{ name: 'author_id', referencedColumnName: 'id'}])
  author: Author;

  @Column({ type: 'integer', name: 'user_id', nullable: true})
  userId: number;

  @ManyToOne(() => Category, (category) => category.id)
  @JoinColumn([{ name: 'category_id', referencedColumnName: 'id'}])
  category: Category;

}
