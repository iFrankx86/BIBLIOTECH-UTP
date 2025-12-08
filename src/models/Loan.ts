// Modelo de Préstamo
export class Loan {
  id: string;
  bookId: string;
  memberId: string;
  loanDate: Date;
  dueDate: Date;
  returnDate?: Date;
  status: 'active' | 'returned' | 'overdue';
  employeeId: string;
  notes?: string;

  constructor(
    id: string,
    bookId: string,
    memberId: string,
    loanDate: Date,
    dueDate: Date,
    employeeId: string,
    status: 'active' | 'returned' | 'overdue' = 'active'
  ) {
    this.id = id;
    this.bookId = bookId;
    this.memberId = memberId;
    this.loanDate = loanDate;
    this.dueDate = dueDate;
    this.status = status;
    this.employeeId = employeeId;
  }

  isOverdue(): boolean {
    return !this.returnDate && new Date() > this.dueDate;
  }
}
