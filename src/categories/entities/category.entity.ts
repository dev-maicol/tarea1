import { Book } from "src/books/entities/book.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";

@Entity('categories')
export class Category {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'character varying', length: 20, nullable: false})
  name: string;

  @Column({ type: 'character varying', length: 120})
  description: string;

  @CreateDateColumn({ type: 'timestamp with time zone', name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone', name: 'updated_at'})
  updatedAt: Date;

  @OneToMany(() => Book, book => book.category)
  books: Book[]

}

