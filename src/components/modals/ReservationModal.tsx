import { Modal, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { Reservation, Book, Member } from '../../models';

interface ReservationModalProps {
  show: boolean;
  onHide: () => void;
  reservation?: Reservation | null;
}

const ReservationModal = ({ show, onHide, reservation }: ReservationModalProps) => {
  const { addReservation, updateReservation, books, members } = useData();
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    memberId: reservation?.memberId || user?.id || '',
    bookId: reservation?.bookId || '',
  });

  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validar que el libro esté disponible
    const selectedBook = books.find((b: Book) => b.id === formData.bookId);
    if (!selectedBook || selectedBook.availableCopies === 0) {
      setError('El libro seleccionado no está disponible actualmente.');
      return;
    }

    // Calcular fecha de expiración (7 días desde ahora)
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 7);

    const newReservation = new Reservation(
      reservation?.id || Date.now().toString(),
      formData.bookId,
      formData.memberId,
      reservation ? new Date(reservation.reservationDate) : new Date(),
      reservation ? new Date(reservation.expirationDate) : expirationDate,
      reservation?.status || 'pending'
    );
    newReservation.notified = reservation?.notified ?? false;

    try {
      if (reservation) {
        await updateReservation(newReservation);
      } else {
        await addReservation(newReservation);
      }
      onHide();
      // Resetear formulario
      setFormData({
        memberId: user?.id || '',
        bookId: '',
      });
    } catch (err) {
      setError('No se pudo guardar la reserva. Verifique disponibilidad del libro.');
    }
  };

  const availableBooks = books.filter((book: Book) => book.availableCopies > 0 || book.id === reservation?.bookId);

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          <i className="bi bi-bookmark-plus me-2"></i>
          {reservation ? 'Editar Reserva' : 'Nueva Reserva'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && (
          <Alert variant="danger" dismissible onClose={() => setError('')}>
            {error}
          </Alert>
        )}
        
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={12}>
              <Form.Group className="mb-3">
                <Form.Label>Miembro *</Form.Label>
                <Form.Select
                  value={formData.memberId}
                  onChange={(e) => setFormData({ ...formData, memberId: e.target.value })}
                  required
                  disabled={user?.role === 'member'} // Los miembros solo pueden reservar para sí mismos
                >
                  <option value="">Seleccione un miembro</option>
                  {members.map((member: Member) => (
                    <option key={member.id} value={member.id}>
                      {member.fullName} - {member.email}
                    </option>
                  ))}
                </Form.Select>
                {user?.role === 'member' && (
                  <Form.Text className="text-muted">
                    Reservando para: {user.fullName}
                  </Form.Text>
                )}
              </Form.Group>
            </Col>

            <Col md={12}>
              <Form.Group className="mb-3">
                <Form.Label>Libro *</Form.Label>
                <Form.Select
                  value={formData.bookId}
                  onChange={(e) => setFormData({ ...formData, bookId: e.target.value })}
                  required
                >
                  <option value="">Seleccione un libro</option>
                  {availableBooks.map((book: Book) => (
                    <option key={book.id} value={book.id}>
                      {book.title} - ISBN: {book.isbn} ({book.availableCopies} disponibles)
                    </option>
                  ))}
                </Form.Select>
                <Form.Text className="text-muted">
                  Solo se muestran libros con copias disponibles
                </Form.Text>
              </Form.Group>
            </Col>
          </Row>

          <div className="d-flex justify-content-end gap-2">
            <Button variant="secondary" onClick={onHide}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              <i className="bi bi-check-circle me-2"></i>
              {reservation ? 'Actualizar Reserva' : 'Crear Reserva'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ReservationModal;
