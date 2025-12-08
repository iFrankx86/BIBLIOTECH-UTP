import { Modal, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { Loan } from '../../models';

interface LoanModalProps {
  show: boolean;
  onHide: () => void;
}

const LoanModal = ({ show, onHide }: LoanModalProps) => {
  const { addLoan, books, members, employees } = useData();
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    bookId: '',
    memberId: '',
    loanDays: 14,
  });

  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const selectedBook = books.find(b => b.id === formData.bookId);
    if (selectedBook && selectedBook.availableCopies <= 0) {
      setError('No hay copias disponibles de este libro');
      return;
    }

    const loanDate = new Date();
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + formData.loanDays);

    const newLoan = new Loan(
      Date.now().toString(),
      formData.bookId,
      formData.memberId,
      loanDate,
      dueDate,
      employees[0]?.id || user?.id || '1'
    );

    addLoan(newLoan);
    
    // Actualizar copias disponibles
    if (selectedBook) {
      selectedBook.availableCopies--;
    }

    onHide();
    setFormData({ bookId: '', memberId: '', loanDays: 14 });
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>
          <i className="bi bi-arrow-right-circle me-2"></i>
          Registrar Préstamo
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
                .filter(book => book.availableCopies > 0)
                .map((book) => (
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
              {members.map((member) => (
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
