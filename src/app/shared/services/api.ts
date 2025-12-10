import axios from 'axios';
import { Book, Author, Member, Loan, Category, Publisher, Reservation, Fine, Inventory, Supplier, Employee, User } from '../types';

const API_URL = 'http://localhost:3001';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Users API
export const usersAPI = {
  getAll: () => api.get<User[]>('/users'),
  getById: (id: string) => api.get<User>(`/users/${id}`),
  create: (user: User) => api.post<User>('/users', user),
  update: (id: string, user: User) => api.put<User>(`/users/${id}`, user),
  delete: (id: string) => api.delete(`/users/${id}`),
  login: async (username: string, password: string) => {
    const response = await api.get<User[]>(`/users?username=${username}&password=${password}&active=true`);
    return response.data[0] || null;
  },
};

// Books API
export const booksAPI = {
  getAll: () => api.get<Book[]>('/books'),
  getById: (id: string) => api.get<Book>(`/books/${id}`),
  create: (book: Book) => api.post<Book>('/books', book),
  update: (id: string, book: Book) => api.put<Book>(`/books/${id}`, book),
  delete: (id: string) => api.delete(`/books/${id}`),
};

// Authors API
export const authorsAPI = {
  getAll: () => api.get<Author[]>('/authors'),
  getById: (id: string) => api.get<Author>(`/authors/${id}`),
  create: (author: Author) => api.post<Author>('/authors', author),
  update: (id: string, author: Author) => api.put<Author>(`/authors/${id}`, author),
  delete: (id: string) => api.delete(`/authors/${id}`),
};

// Members API
export const membersAPI = {
  getAll: () => api.get<Member[]>('/members'),
  getById: (id: string) => api.get<Member>(`/members/${id}`),
  create: (member: Member) => api.post<Member>('/members', member),
  update: (id: string, member: Member) => api.put<Member>(`/members/${id}`, member),
  delete: (id: string) => api.delete(`/members/${id}`),
};

// Loans API
export const loansAPI = {
  getAll: () => api.get<Loan[]>('/loans'),
  getById: (id: string) => api.get<Loan>(`/loans/${id}`),
  getByMemberId: (memberId: string) => api.get<Loan[]>(`/loans?memberId=${memberId}`),
  create: (loan: Loan) => api.post<Loan>('/loans', loan),
  update: (id: string, loan: Loan) => api.put<Loan>(`/loans/${id}`, loan),
  delete: (id: string) => api.delete(`/loans/${id}`),
};

// Categories API
export const categoriesAPI = {
  getAll: () => api.get<Category[]>('/categories'),
  getById: (id: string) => api.get<Category>(`/categories/${id}`),
  create: (category: Category) => api.post<Category>('/categories', category),
  update: (id: string, category: Category) => api.put<Category>(`/categories/${id}`, category),
  delete: (id: string) => api.delete(`/categories/${id}`),
};

// Publishers API
export const publishersAPI = {
  getAll: () => api.get<Publisher[]>('/publishers'),
  getById: (id: string) => api.get<Publisher>(`/publishers/${id}`),
  create: (publisher: Publisher) => api.post<Publisher>('/publishers', publisher),
  update: (id: string, publisher: Publisher) => api.put<Publisher>(`/publishers/${id}`, publisher),
  delete: (id: string) => api.delete(`/publishers/${id}`),
};

// Reservations API
export const reservationsAPI = {
  getAll: () => api.get<Reservation[]>('/reservations'),
  getById: (id: string) => api.get<Reservation>(`/reservations/${id}`),
  getByMemberId: (memberId: string) => api.get<Reservation[]>(`/reservations?memberId=${memberId}`),
  create: (reservation: Reservation) => api.post<Reservation>('/reservations', reservation),
  update: (id: string, reservation: Reservation) => api.put<Reservation>(`/reservations/${id}`, reservation),
  delete: (id: string) => api.delete(`/reservations/${id}`),
};

// Fines API
export const finesAPI = {
  getAll: () => api.get<Fine[]>('/fines'),
  getById: (id: string) => api.get<Fine>(`/fines/${id}`),
  getByMemberId: (memberId: string) => api.get<Fine[]>(`/fines?memberId=${memberId}`),
  create: (fine: Fine) => api.post<Fine>('/fines', fine),
  update: (id: string, fine: Fine) => api.put<Fine>(`/fines/${id}`, fine),
  delete: (id: string) => api.delete(`/fines/${id}`),
};

// Inventory API
export const inventoryAPI = {
  getAll: () => api.get<Inventory[]>('/inventory'),
  getById: (id: string) => api.get<Inventory>(`/inventory/${id}`),
  getByBookId: (bookId: string) => api.get<Inventory[]>(`/inventory?bookId=${bookId}`),
  create: (inventory: Inventory) => api.post<Inventory>('/inventory', inventory),
  update: (id: string, inventory: Inventory) => api.put<Inventory>(`/inventory/${id}`, inventory),
  delete: (id: string) => api.delete(`/inventory/${id}`),
};

// Suppliers API
export const suppliersAPI = {
  getAll: () => api.get<Supplier[]>('/suppliers'),
  getById: (id: string) => api.get<Supplier>(`/suppliers/${id}`),
  create: (supplier: Supplier) => api.post<Supplier>('/suppliers', supplier),
  update: (id: string, supplier: Supplier) => api.put<Supplier>(`/suppliers/${id}`, supplier),
  delete: (id: string) => api.delete(`/suppliers/${id}`),
};

// Employees API
export const employeesAPI = {
  getAll: () => api.get<Employee[]>('/employees'),
  getById: (id: string) => api.get<Employee>(`/employees/${id}`),
  create: (employee: Employee) => api.post<Employee>('/employees', employee),
  update: (id: string, employee: Employee) => api.put<Employee>(`/employees/${id}`, employee),
  delete: (id: string) => api.delete(`/employees/${id}`),
};

export default api;
