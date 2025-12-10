// Modelo de Proveedor
export class Supplier {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  website?: string;
  taxId: string;
  active: boolean;
  rating: number;

  constructor(
    id: string,
    name: string,
    contactPerson: string,
    email: string,
    phone: string,
    address: string,
    taxId: string,
    active: boolean = true,
    rating: number = 5
  ) {
    this.id = id;
    this.name = name;
    this.contactPerson = contactPerson;
    this.email = email;
    this.phone = phone;
    this.address = address;
    this.taxId = taxId;
    this.active = active;
    this.rating = rating;
  }
}
