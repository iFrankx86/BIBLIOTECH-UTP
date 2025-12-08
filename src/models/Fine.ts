// Modelo de Multa
export class Fine {
  id: string;
  loanId: string;
  memberId: string;
  amount: number;
  reason: string;
  issueDate: Date;
  paymentDate?: Date;
  status: 'pending' | 'paid' | 'waived';
  notes?: string;

  constructor(
    id: string,
    loanId: string,
    memberId: string,
    amount: number,
    reason: string,
    issueDate: Date,
    status: 'pending' | 'paid' | 'waived' = 'pending'
  ) {
    this.id = id;
    this.loanId = loanId;
    this.memberId = memberId;
    this.amount = amount;
    this.reason = reason;
    this.issueDate = issueDate;
    this.status = status;
  }
}
