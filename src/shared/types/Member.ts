// Modelo de Miembro
export class Member {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  membershipDate: Date;
  membershipType: 'basic' | 'premium' | 'vip';
  active: boolean;
  photo?: string;
  idNumber: string;

  constructor(
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    address: string,
    membershipType: 'basic' | 'premium' | 'vip',
    idNumber: string,
    active: boolean = true
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
    this.address = address;
    this.membershipDate = new Date();
    this.membershipType = membershipType;
    this.active = active;
    this.idNumber = idNumber;
  }

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
