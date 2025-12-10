// Modelo de Libro
export class Book {
  id: string;
  title: string;
  isbn: string;
  authorId: string;
  publisherId: string;
  categoryId: string;
  publicationYear: number;
  totalCopies: number;
  availableCopies: number;
  description: string;
  language: string;
  pages: number;
  coverImage?: string;

  constructor(
    id: string,
    title: string,
    isbn: string,
    authorId: string,
    publisherId: string,
    categoryId: string,
    publicationYear: number,
    totalCopies: number,
    description: string,
    language: string = 'Español',
    pages: number = 0
  ) {
    this.id = id;
    this.title = title;
    this.isbn = isbn;
    this.authorId = authorId;
    this.publisherId = publisherId;
    this.categoryId = categoryId;
    this.publicationYear = publicationYear;
    this.totalCopies = totalCopies;
    this.availableCopies = totalCopies;
    this.description = description;
    this.language = language;
    this.pages = pages;
  }
}
