// Modelo de Reserva
export class Reservation {
  id: string;
  bookId: string;
  memberId: string;
  reservationDate: Date;
  expirationDate: Date;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'expired';
  notified: boolean;

  constructor(
    id: string,
    bookId: string,
    memberId: string,
    reservationDate: Date,
    expirationDate: Date,
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'expired' = 'pending'
  ) {
    this.id = id;
    this.bookId = bookId;
    this.memberId = memberId;
    this.reservationDate = reservationDate;
    this.expirationDate = expirationDate;
    this.status = status;
    this.notified = false;
  }
}
