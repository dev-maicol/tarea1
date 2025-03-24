import { Book } from "src/books/entities/book.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('authors')

export class Author {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'character varying', length: 120 })
  name: string;

  @Column({ type: 'character varying', length: 60})
  nationality: string;

  @Column({ type: 'date', name: 'birth_date'})
  birthDate: Date;

  @CreateDateColumn({ type: 'time without time zone', name: 'created_at', select: false})
  createdAt: Date;

  @UpdateDateColumn({ type: 'time without time zone', name: 'updated_at', nullable: true, select: false})
  updatedAt: Date;

  @Column({ type: 'integer', name: 'user_id', nullable: true})
  userId: number;

  @OneToMany(() => Book, book => book.author)
  books: Book[]


}
