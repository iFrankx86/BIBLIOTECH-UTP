import { Modal, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { Loan, Book, Member } from '../../models';

interface LoanModalProps {
  show: boolean;
  onHide: () => void;
  loan?: Loan;
}

const LoanModal = ({ show, onHide, loan }: LoanModalProps) => {
  const { addLoan, updateLoan, books, members, employees } = useData();
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    bookId: loan?.bookId || '',
    memberId: loan?.memberId || '',
    loanDays: loan ? Math.ceil((new Date(loan.dueDate).getTime() - new Date(loan.loanDate).getTime()) / (1000 * 60 * 60 * 24)) : 14,
  });

  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const selectedBook = books.find((b: Book) => b.id === formData.bookId);
    if (!loan && selectedBook && selectedBook.availableCopies <= 0) {
      setError('No hay copias disponibles de este libro');
      return;
    }

    const loanDate = loan ? new Date(loan.loanDate) : new Date();
    const dueDate = new Date(loanDate);
    dueDate.setDate(dueDate.getDate() + formData.loanDays);

    if (loan) {
      // Update existing loan
      const updatedLoan = new Loan(
        loan.id,
        formData.bookId,
        formData.memberId,
        loanDate,
        dueDate,
        loan.employeeId
      );
      updatedLoan.returnDate = loan.returnDate;
      await updateLoan(updatedLoan);
    } else {
      // Create new loan
      const newLoan = new Loan(
        Date.now().toString(),
        formData.bookId,
        formData.memberId,
        loanDate,
        dueDate,
        employees[0]?.id || user?.id || '1'
      );
      await addLoan(newLoan);
    }

    onHide();
    setFormData({ bookId: '', memberId: '', loanDays: 14 });
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>
          <i className="bi bi-arrow-right-circle me-2"></i>
          {loan ? 'Editar Préstamo' : 'Registrar Préstamo'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Libro *</Form.Label>
            <Form.Select
              value={formData.bookId}
              onChange={(e) => setFormData({ ...formData, bookId: e.target.value })}
              required
            >
              <option value="">Seleccionar libro</option>
              {books
                .filter((book: Book) => book.availableCopies > 0 || book.id === loan?.bookId)
                .map((book: Book) => (
                  <option key={book.id} value={book.id}>
                    {book.title} (Disponibles: {book.availableCopies})
                  </option>
                ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Miembro *</Form.Label>
            <Form.Select
              value={formData.memberId}
              onChange={(e) => setFormData({ ...formData, memberId: e.target.value })}
              required
            >
              <option value="">Seleccionar miembro</option>
              {members.map((member: Member) => (
                <option key={member.id} value={member.id}>
                  {member.fullName} - {member.email}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Días de préstamo *</Form.Label>
                <Form.Control
                  type="number"
                  value={formData.loanDays}
                  onChange={(e) => setFormData({ ...formData, loanDays: parseInt(e.target.value) })}
                  min="1"
                  max="30"
                  required
                />
                <Form.Text className="text-muted">
                  Fecha de vencimiento: {new Date(Date.now() + formData.loanDays * 24 * 60 * 60 * 1000).toLocaleDateString()}
                </Form.Text>
              </Form.Group>
            </Col>
          </Row>

          <div className="d-flex justify-content-end gap-2">
            <Button variant="secondary" onClick={onHide}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              Registrar Préstamo
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default LoanModal;
