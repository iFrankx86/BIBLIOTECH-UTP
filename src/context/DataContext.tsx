import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { Book, Author, Member, Loan, Category, Publisher, Reservation, Fine, Inventory, Supplier, Employee } from '../models';

interface DataContextType {
  books: Book[];
  authors: Author[];
  members: Member[];
  loans: Loan[];
  categories: Category[];
  publishers: Publisher[];
  reservations: Reservation[];
  fines: Fine[];
  inventory: Inventory[];
  suppliers: Supplier[];
  employees: Employee[];
  addBook: (book: Book) => void;
  updateBook: (book: Book) => void;
  deleteBook: (id: string) => void;
  addAuthor: (author: Author) => void;
  addMember: (member: Member) => void;
  addLoan: (loan: Loan) => void;
  addCategory: (category: Category) => void;
  addPublisher: (publisher: Publisher) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Datos de ejemplo
const initialCategories: Category[] = [
  new Category('1', 'Ficción', 'Obras literarias de ficción'),
  new Category('2', 'No Ficción', 'Obras de no ficción'),
  new Category('3', 'Ciencia', 'Libros científicos y técnicos'),
  new Category('4', 'Historia', 'Libros históricos'),
];

const initialPublishers: Publisher[] = [
  new Publisher('1', 'Editorial Planeta', 'España', 'www.planeta.es', 'info@planeta.es', '+34900123456', 'Barcelona, España', 1949),
  new Publisher('2', 'Penguin Random House', 'USA', 'www.penguinrandomhouse.com', 'info@prh.com', '+1234567890', 'New York, USA', 1927),
];

const initialAuthors: Author[] = [
  new Author('1', 'Gabriel', 'García Márquez', new Date('1927-03-06'), 'Colombiano', 'Escritor y periodista colombiano, ganador del Premio Nobel de Literatura'),
  new Author('2', 'Isabel', 'Allende', new Date('1942-08-02'), 'Chilena', 'Escritora chilena de narrativa y novela'),
];

const initialBooks: Book[] = [
  new Book('1', 'Cien años de soledad', '978-0-307-47472-3', '1', '1', '1', 1967, 10, 'Novela del escritor colombiano Gabriel García Márquez', 'Español', 432),
  new Book('2', 'La casa de los espíritus', '978-1-501-11707-8', '2', '2', '1', 1982, 8, 'Primera novela de Isabel Allende', 'Español', 448),
];

const initialMembers: Member[] = [
  new Member('1', 'Juan', 'Pérez', 'juan.perez@email.com', '555-0101', 'Calle Principal 123', 'premium', '12345678'),
  new Member('2', 'María', 'González', 'maria.gonzalez@email.com', '555-0102', 'Avenida Central 456', 'basic', '87654321'),
];

const initialEmployees: Employee[] = [
  new Employee('1', 'Carlos', 'Rodríguez', 'carlos@bibliotech.com', '555-0201', 'Bibliotecario Jefe', 'circulation', new Date('2020-01-15'), 45000, true),
];

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }: { children: ReactNode }) => {
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [authors, setAuthors] = useState<Author[]>(initialAuthors);
  const [members, setMembers] = useState<Member[]>(initialMembers);
  const [loans, setLoans] = useState<Loan[]>([]);
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [publishers, setPublishers] = useState<Publisher[]>(initialPublishers);
  const [reservations] = useState<Reservation[]>([]);
  const [fines] = useState<Fine[]>([]);
  const [inventory] = useState<Inventory[]>([]);
  const [suppliers] = useState<Supplier[]>([]);
  const [employees] = useState<Employee[]>(initialEmployees);

  const addBook = (book: Book) => setBooks([...books, book]);
  const updateBook = (updatedBook: Book) => {
    setBooks(books.map((book: Book) => book.id === updatedBook.id ? updatedBook : book));
  };
  const deleteBook = (id: string) => setBooks(books.filter((book: Book) => book.id !== id));
  
  const addAuthor = (author: Author) => setAuthors([...authors, author]);
  const addMember = (member: Member) => setMembers([...members, member]);
  const addLoan = (loan: Loan) => setLoans([...loans, loan]);
  const addCategory = (category: Category) => setCategories([...categories, category]);
  const addPublisher = (publisher: Publisher) => setPublishers([...publishers, publisher]);

  return (
    <DataContext.Provider
      value={{
        books,
        authors,
        members,
        loans,
        categories,
        publishers,
        reservations,
        fines,
        inventory,
        suppliers,
        employees,
        addBook,
        updateBook,
        deleteBook,
        addAuthor,
        addMember,
        addLoan,
        addCategory,
        addPublisher,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData debe ser usado dentro de un DataProvider');
  }
  return context;
};
