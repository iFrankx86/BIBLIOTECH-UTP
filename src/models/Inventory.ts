// Modelo de Inventario
export class Inventory {
  id: string;
  bookId: string;
  barcode: string;
  location: string;
  condition: 'excellent' | 'good' | 'fair' | 'poor' | 'damaged';
  acquisitionDate: Date;
  acquisitionPrice: number;
  status: 'available' | 'loaned' | 'reserved' | 'maintenance' | 'lost';
  notes?: string;

  constructor(
    id: string,
    bookId: string,
    barcode: string,
    location: string,
    condition: 'excellent' | 'good' | 'fair' | 'poor' | 'damaged',
    acquisitionDate: Date,
    acquisitionPrice: number,
    status: 'available' | 'loaned' | 'reserved' | 'maintenance' | 'lost' = 'available'
  ) {
    this.id = id;
    this.bookId = bookId;
    this.barcode = barcode;
    this.location = location;
    this.condition = condition;
    this.acquisitionDate = acquisitionDate;
    this.acquisitionPrice = acquisitionPrice;
    this.status = status;
  }
}
