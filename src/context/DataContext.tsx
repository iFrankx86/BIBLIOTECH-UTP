import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import { Book, Author, Member, Loan, Category, Publisher, Reservation, Fine, Inventory, Supplier, Employee } from '../models';
import { booksAPI, authorsAPI, membersAPI, loansAPI, categoriesAPI, publishersAPI, reservationsAPI, finesAPI, inventoryAPI, suppliersAPI, employeesAPI } from '../services/api';

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
  loading: boolean;
  error: string | null;
  addBook: (book: Book) => Promise<void>;
  updateBook: (book: Book) => Promise<void>;
  deleteBook: (id: string) => Promise<void>;
  addAuthor: (author: Author) => Promise<void>;
  updateAuthor: (author: Author) => Promise<void>;
  deleteAuthor: (id: string) => Promise<void>;
  addMember: (member: Member) => Promise<void>;
  updateMember: (member: Member) => Promise<void>;
  deleteMember: (id: string) => Promise<void>;
  addLoan: (loan: Loan) => Promise<void>;
  updateLoan: (loan: Loan) => Promise<void>;
  deleteLoan: (id: string) => Promise<void>;
  addCategory: (category: Category) => Promise<void>;
  updateCategory: (category: Category) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
  addPublisher: (publisher: Publisher) => Promise<void>;
  updatePublisher: (publisher: Publisher) => Promise<void>;
  deletePublisher: (id: string) => Promise<void>;
  addReservation: (reservation: Reservation) => Promise<void>;
  updateReservation: (reservation: Reservation) => Promise<void>;
  deleteReservation: (id: string) => Promise<void>;
  confirmReservation: (id: string) => Promise<void>;
  cancelReservation: (id: string) => Promise<void>;
  completeReservation: (id: string) => Promise<void>;
  addFine: (fine: Fine) => Promise<void>;
  updateFine: (fine: Fine) => Promise<void>;
  deleteFine: (id: string) => Promise<void>;
  addInventory: (item: Inventory) => Promise<void>;
  updateInventory: (item: Inventory) => Promise<void>;
  deleteInventory: (id: string) => Promise<void>;
  addSupplier: (supplier: Supplier) => Promise<void>;
  updateSupplier: (supplier: Supplier) => Promise<void>;
  deleteSupplier: (id: string) => Promise<void>;
  addEmployee: (employee: Employee) => Promise<void>;
  updateEmployee: (employee: Employee) => Promise<void>;
  deleteEmployee: (id: string) => Promise<void>;
  confirmReturn: (loanId: string, returnDate?: Date) => Promise<void>;
  refreshAll: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }: { children: ReactNode }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [loans, setLoans] = useState<Loan[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [publishers, setPublishers] = useState<Publisher[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [fines, setFines] = useState<Fine[]>([]);
  const [inventory, setInventory] = useState<Inventory[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Helper function to convert plain objects to class instances
  const hydrateAuthors = (data: Record<string, unknown>[]): Author[] => {
    return data.map((item: Record<string, unknown>) => {
      const author = new Author(
        item.id as string,
        item.firstName as string,
        item.lastName as string,
        new Date(item.birthDate as string),
        item.nationality as string,
        item.biography as string
      );
      if (item.photo) author.photo = item.photo as string;
      return author;
    });
  };

  const hydrateBooks = (data: Record<string, unknown>[]): Book[] => {
    return data.map((item: Record<string, unknown>) => {
      const book = new Book(
        item.id as string,
        item.title as string,
        item.isbn as string,
        item.authorId as string,
        item.publisherId as string,
        item.categoryId as string,
        item.publicationYear as number,
        item.totalCopies as number,
        item.description as string,
        item.language as string,
        item.pages as number
      );
      book.availableCopies = item.availableCopies as number;
      return book;
    });
  };

  const hydrateCategories = (data: Record<string, unknown>[]): Category[] => {
    return data.map((item: Record<string, unknown>) => {
      const category = new Category(
        item.id as string,
        item.name as string,
        item.description as string,
        item.parentCategoryId as string | undefined,
        item.active !== undefined ? (item.active as boolean) : true
      );
      return category;
    });
  };

  const hydrateMembers = (data: Record<string, unknown>[]): Member[] => {
    return data.map((item: Record<string, unknown>) => {
      const member = new Member(
        item.id as string,
        item.firstName as string,
        item.lastName as string,
        item.email as string,
        item.phone as string,
        item.address as string,
        item.membershipType as 'basic' | 'premium' | 'vip',
        item.idNumber as string,
        item.active !== undefined ? (item.active as boolean) : true
      );
      member.membershipDate = new Date(item.membershipDate as string);
      return member;
    });
  };

  const hydrateEmployees = (data: Record<string, unknown>[]): Employee[] => {
    return data.map((item: Record<string, unknown>) => {
      const employee = new Employee(
        item.id as string,
        item.firstName as string,
        item.lastName as string,
        item.email as string,
        item.phone as string,
        item.position as string,
        item.department as 'administration' | 'circulation' | 'cataloging' | 'reference' | 'maintenance',
        new Date(item.hireDate as string),
        item.salary as number,
        item.active as boolean
      );
      if (item.userId) employee.userId = item.userId as string;
      return employee;
    });
  };

  const findBook = (bookId: string): Book | undefined => books.find((b: Book) => b.id === bookId);

  const adjustAvailableCopies = async (bookId: string, delta: number) => {
    const book = findBook(bookId);
    if (!book) return;
    const nextAvailable = Math.max(0, Math.min(book.totalCopies, book.availableCopies + delta));
    if (nextAvailable === book.availableCopies) return;
    const updatedBook = { ...book, availableCopies: nextAvailable } as Book;
    await booksAPI.update(updatedBook.id, updatedBook);
    setBooks(books.map((b: Book) => (b.id === updatedBook.id ? updatedBook : b)));
  };

  const fetchAllData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [booksRes, authorsRes, membersRes, loansRes, categoriesRes, publishersRes, reservationsRes, finesRes, inventoryRes, suppliersRes, employeesRes] = await Promise.all([
        booksAPI.getAll(),
        authorsAPI.getAll(),
        membersAPI.getAll(),
        loansAPI.getAll(),
        categoriesAPI.getAll(),
        publishersAPI.getAll(),
        reservationsAPI.getAll(),
        finesAPI.getAll(),
        inventoryAPI.getAll(),
        suppliersAPI.getAll(),
        employeesAPI.getAll(),
      ]);

      setBooks(hydrateBooks(booksRes.data as unknown as Record<string, unknown>[]));
      setAuthors(hydrateAuthors(authorsRes.data as unknown as Record<string, unknown>[]));
      setMembers(hydrateMembers(membersRes.data as unknown as Record<string, unknown>[]));
      setEmployees(hydrateEmployees(employeesRes.data as unknown as Record<string, unknown>[]));
      setLoans(loansRes.data);
      setCategories(hydrateCategories(categoriesRes.data as unknown as Record<string, unknown>[]));
      setPublishers(publishersRes.data);
      setReservations(reservationsRes.data);
      setFines(finesRes.data);
      setInventory(inventoryRes.data);
      setSuppliers(suppliersRes.data);
    } catch (err) {
      setError('Error al cargar los datos');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  const addBook = async (book: Book) => {
    const response = await booksAPI.create(book);
    setBooks([...books, response.data]);
  };

  const updateBook = async (updatedBook: Book) => {
    await booksAPI.update(updatedBook.id, updatedBook);
    setBooks(books.map((book: Book) => book.id === updatedBook.id ? updatedBook : book));
  };

  const deleteBook = async (id: string) => {
    await booksAPI.delete(id);
    setBooks(books.filter((book: Book) => book.id !== id));
  };

  const addAuthor = async (author: Author) => {
    const response = await authorsAPI.create(author);
    setAuthors([...authors, response.data]);
  };

  const updateAuthor = async (updatedAuthor: Author) => {
    await authorsAPI.update(updatedAuthor.id, updatedAuthor);
    setAuthors(authors.map((author: Author) => author.id === updatedAuthor.id ? updatedAuthor : author));
  };

  const deleteAuthor = async (id: string) => {
    await authorsAPI.delete(id);
    setAuthors(authors.filter((author: Author) => author.id !== id));
  };

  const addMember = async (member: Member) => {
    const response = await membersAPI.create(member);
    setMembers([...members, response.data]);
  };

  const updateMember = async (updatedMember: Member) => {
    await membersAPI.update(updatedMember.id, updatedMember);
    setMembers(members.map((member: Member) => member.id === updatedMember.id ? updatedMember : member));
  };

  const deleteMember = async (id: string) => {
    await membersAPI.delete(id);
    setMembers(members.filter((member: Member) => member.id !== id));
  };

  const addLoan = async (loan: Loan) => {
    const response = await loansAPI.create(loan);
    setLoans([...loans, response.data]);
    const book = books.find((b: Book) => b.id === loan.bookId);
    if (book && book.availableCopies > 0) {
      await adjustAvailableCopies(book.id, -1);
    }
  };

  const updateLoan = async (updatedLoan: Loan) => {
    const oldLoan = loans.find((l: Loan) => l.id === updatedLoan.id);
    await loansAPI.update(updatedLoan.id, updatedLoan);
    setLoans(loans.map((loan: Loan) => loan.id === updatedLoan.id ? updatedLoan : loan));
    const becameReturned = oldLoan && oldLoan.status !== 'returned' && updatedLoan.status === 'returned';
    if (becameReturned) {
      await adjustAvailableCopies(updatedLoan.bookId, 1);

      const effectiveReturnDate = updatedLoan.returnDate ? new Date(updatedLoan.returnDate) : new Date();
      const dueDate = new Date(updatedLoan.dueDate);
      const isLate = effectiveReturnDate > dueDate;

      if (isLate) {
        const daysLate = Math.max(1, Math.ceil((effectiveReturnDate.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24)));
        const amount = Number((daysLate * 2).toFixed(2));
        const existingFine = fines.find((fine: Fine) => fine.loanId === updatedLoan.id && fine.status === 'pending');

        if (!existingFine) {
          const newFine = new Fine(
            Date.now().toString(),
            updatedLoan.id,
            updatedLoan.memberId,
            amount,
            `Devolución tardía (${daysLate} día${daysLate > 1 ? 's' : ''})`,
            effectiveReturnDate,
            'pending'
          );
          await addFine(newFine);
        }
      }
    }
  };

  const deleteLoan = async (id: string) => {
    await loansAPI.delete(id);
    setLoans(loans.filter((loan: Loan) => loan.id !== id));
  };

  const addCategory = async (category: Category) => {
    const response = await categoriesAPI.create(category);
    setCategories([...categories, response.data]);
  };

  const updateCategory = async (updatedCategory: Category) => {
    await categoriesAPI.update(updatedCategory.id, updatedCategory);
    setCategories(categories.map((category: Category) => category.id === updatedCategory.id ? updatedCategory : category));
  };

  const deleteCategory = async (id: string) => {
    await categoriesAPI.delete(id);
    setCategories(categories.filter((category: Category) => category.id !== id));
  };

  const addPublisher = async (publisher: Publisher) => {
    const response = await publishersAPI.create(publisher);
    setPublishers([...publishers, response.data]);
  };

  const updatePublisher = async (updatedPublisher: Publisher) => {
    await publishersAPI.update(updatedPublisher.id, updatedPublisher);
    setPublishers(publishers.map((publisher: Publisher) => publisher.id === updatedPublisher.id ? updatedPublisher : publisher));
  };

  const deletePublisher = async (id: string) => {
    await publishersAPI.delete(id);
    setPublishers(publishers.filter((publisher: Publisher) => publisher.id !== id));
  };

  const addReservation = async (reservation: Reservation) => {
    const response = await reservationsAPI.create(reservation);
    setReservations([...reservations, response.data]);
  };

  const updateReservation = async (updatedReservation: Reservation) => {
    const current = reservations.find((res: Reservation) => res.id === updatedReservation.id);
    const prevStatus = current?.status;
    const nextStatus = updatedReservation.status;

    if (prevStatus !== 'confirmed' && nextStatus === 'confirmed') {
      const book = findBook(updatedReservation.bookId);
      if (!book || book.availableCopies <= 0) {
        throw new Error('No hay copias disponibles para confirmar la reserva');
      }
      await adjustAvailableCopies(updatedReservation.bookId, -1);
    }

    if (prevStatus === 'confirmed' && nextStatus === 'cancelled') {
      await adjustAvailableCopies(updatedReservation.bookId, 1);
    }

    await reservationsAPI.update(updatedReservation.id, updatedReservation);
    setReservations(reservations.map((reservation: Reservation) => reservation.id === updatedReservation.id ? updatedReservation : reservation));
  };

  const deleteReservation = async (id: string) => {
    const reservation = reservations.find((res: Reservation) => res.id === id);
    if (reservation && reservation.status === 'confirmed') {
      await adjustAvailableCopies(reservation.bookId, 1);
    }
    await reservationsAPI.delete(id);
    setReservations(reservations.filter((reservation: Reservation) => reservation.id !== id));
  };

  const confirmReservation = async (id: string) => {
    const reservation = reservations.find((res: Reservation) => res.id === id);
    if (!reservation) return;
    const updatedReservation = new Reservation(
      reservation.id,
      reservation.bookId,
      reservation.memberId,
      new Date(reservation.reservationDate),
      new Date(reservation.expirationDate),
      'confirmed'
    );
    updatedReservation.notified = true;
    await updateReservation(updatedReservation);
  };

  const cancelReservation = async (id: string) => {
    const reservation = reservations.find((res: Reservation) => res.id === id);
    if (!reservation) return;
    const updatedReservation = new Reservation(
      reservation.id,
      reservation.bookId,
      reservation.memberId,
      new Date(reservation.reservationDate),
      new Date(reservation.expirationDate),
      'cancelled'
    );
    await updateReservation(updatedReservation);
  };

  const completeReservation = async (id: string) => {
    const reservation = reservations.find((res: Reservation) => res.id === id);
    if (!reservation) return;
    const updatedReservation = new Reservation(
      reservation.id,
      reservation.bookId,
      reservation.memberId,
      new Date(reservation.reservationDate),
      new Date(reservation.expirationDate),
      'completed'
    );
    await updateReservation(updatedReservation);
  };

  const addFine = async (fine: Fine) => {
    const response = await finesAPI.create(fine);
    setFines([...fines, response.data]);
  };

  const updateFine = async (updatedFine: Fine) => {
    await finesAPI.update(updatedFine.id, updatedFine);
    setFines(fines.map((fine: Fine) => fine.id === updatedFine.id ? updatedFine : fine));
  };

  const deleteFine = async (id: string) => {
    await finesAPI.delete(id);
    setFines(fines.filter((fine: Fine) => fine.id !== id));
  };

  const addInventory = async (item: Inventory) => {
    const response = await inventoryAPI.create(item);
    setInventory([...inventory, response.data]);
  };

  const updateInventory = async (updatedItem: Inventory) => {
    await inventoryAPI.update(updatedItem.id, updatedItem);
    setInventory(inventory.map((item: Inventory) => item.id === updatedItem.id ? updatedItem : item));
  };

  const deleteInventory = async (id: string) => {
    await inventoryAPI.delete(id);
    setInventory(inventory.filter((item: Inventory) => item.id !== id));
  };

  const addSupplier = async (supplier: Supplier) => {
    const response = await suppliersAPI.create(supplier);
    setSuppliers([...suppliers, response.data]);
  };

  const updateSupplier = async (updatedSupplier: Supplier) => {
    await suppliersAPI.update(updatedSupplier.id, updatedSupplier);
    setSuppliers(suppliers.map((supplier: Supplier) => supplier.id === updatedSupplier.id ? updatedSupplier : supplier));
  };

  const deleteSupplier = async (id: string) => {
    await suppliersAPI.delete(id);
    setSuppliers(suppliers.filter((supplier: Supplier) => supplier.id !== id));
  };

  const addEmployee = async (employee: Employee) => {
    const response = await employeesAPI.create(employee);
    setEmployees([...employees, response.data]);
  };

  const updateEmployee = async (updatedEmployee: Employee) => {
    await employeesAPI.update(updatedEmployee.id, updatedEmployee);
    setEmployees(employees.map((employee: Employee) => employee.id === updatedEmployee.id ? updatedEmployee : employee));
  };

  const deleteEmployee = async (id: string) => {
    await employeesAPI.delete(id);
    setEmployees(employees.filter((employee: Employee) => employee.id !== id));
  };

  const confirmReturn = async (loanId: string, returnDate: Date = new Date()) => {
    const loan = loans.find((l: Loan) => l.id === loanId);
    if (!loan) return;
    const updatedLoan = new Loan(
      loan.id,
      loan.bookId,
      loan.memberId,
      new Date(loan.loanDate),
      new Date(loan.dueDate),
      loan.employeeId,
      'returned'
    );
    updatedLoan.returnDate = returnDate;
    if (loan.notes) updatedLoan.notes = loan.notes;
    await updateLoan(updatedLoan);
  };

  const refreshAll = async () => {
    await fetchAllData();
  };

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
        loading,
        error,
        addBook,
        updateBook,
        deleteBook,
        addAuthor,
        updateAuthor,
        deleteAuthor,
        addMember,
        updateMember,
        deleteMember,
        addLoan,
        updateLoan,
        deleteLoan,
        addCategory,
        updateCategory,
        deleteCategory,
        addPublisher,
        updatePublisher,
        deletePublisher,
        addReservation,
        updateReservation,
        deleteReservation,
        confirmReservation,
        cancelReservation,
        completeReservation,
        addFine,
        updateFine,
        deleteFine,
        addInventory,
        updateInventory,
        deleteInventory,
        addSupplier,
        updateSupplier,
        deleteSupplier,
        addEmployee,
        updateEmployee,
        deleteEmployee,
        confirmReturn,
        refreshAll,
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
