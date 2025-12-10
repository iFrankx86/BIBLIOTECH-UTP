// Modelo de Editorial
export class Publisher {
  id: string;
  name: string;
  country: string;
  website: string;
  email: string;
  phone: string;
  address: string;
  foundedYear: number;
  active: boolean;

  constructor(
    id: string,
    name: string,
    country: string,
    website: string,
    email: string,
    phone: string,
    address: string,
    foundedYear: number,
    active: boolean = true
  ) {
    this.id = id;
    this.name = name;
    this.country = country;
    this.website = website;
    this.email = email;
    this.phone = phone;
    this.address = address;
    this.foundedYear = foundedYear;
    this.active = active;
  }
}
