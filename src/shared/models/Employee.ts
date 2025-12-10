// Modelo de Empleado
export class Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  department: 'administration' | 'circulation' | 'cataloging' | 'reference' | 'maintenance';
  hireDate: Date;
  salary: number;
  active: boolean;
  userId?: string;

  constructor(
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    position: string,
    department: 'administration' | 'circulation' | 'cataloging' | 'reference' | 'maintenance',
    hireDate: Date,
    salary: number,
    active: boolean = true
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
    this.position = position;
    this.department = department;
    this.hireDate = hireDate;
    this.salary = salary;
    this.active = active;
  }

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
