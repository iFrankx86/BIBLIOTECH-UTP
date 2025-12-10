// Modelo de Usuario del sistema
export class User {
  id: string;
  username: string;
  password: string;
  email: string;
  role: 'admin' | 'librarian' | 'member';
  fullName: string;
  active: boolean;
  createdAt: Date;

  constructor(
    id: string,
    username: string,
    password: string,
    email: string,
    role: 'admin' | 'librarian' | 'member',
    fullName: string,
    active: boolean = true
  ) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.email = email;
    this.role = role;
    this.fullName = fullName;
    this.active = active;
    this.createdAt = new Date();
  }
}
