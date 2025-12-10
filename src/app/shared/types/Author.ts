// Modelo de Autor
export class Author {
  id: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
  nationality: string;
  biography: string;
  photo?: string;

  constructor(
    id: string,
    firstName: string,
    lastName: string,
    birthDate: Date,
    nationality: string,
    biography: string
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthDate = birthDate;
    this.nationality = nationality;
    this.biography = biography;
  }

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
