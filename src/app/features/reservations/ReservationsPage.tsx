import { useState } from 'react';
import { Card, Table, Button, Badge, Alert, ButtonGroup, Spinner, Modal, ListGroup } from 'react-bootstrap';
import { useData } from '../../shared/context/DataContext';
import { useAuth } from '../../shared/context/AuthContext';
import { usePermissions } from '../../shared/hooks/usePermissions';
import { Reservation, Book, Member } from '../../shared/types';
import ReservationModal from './ReservationModal';
import { useNavigate } from 'react-router-dom';

const ReservationsPage = () => {
  const { reservations, books, members, confirmReservation, cancelReservation, convertReservationToLoan, deleteReservation } = useData();
  const { user } = useAuth();
  const { hasPermission, role } = usePermissions();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [detailReservation, setDetailReservation] = useState<Reservation | null>(null);
  const [error, setError] = useState('');
  const [processingId, setProcessingId] = useState<string | null>(null);

  // Filtrar reservas según el rol
  const displayReservations = role === 'member'
    ? reservations.filter((res: Reservation) => res.memberId === user?.id)
    : reservations;

  const getBookTitle = (bookId: string) => {
    const book = books.find((b: Book) => b.id === bookId);
    return book ? book.title : 'Libro no encontrado';
  };

  const getMemberName = (memberId: string) => {
    const member = members.find((m: Member) => m.id === memberId);
    return member ? member.fullName : 'Miembro no encontrado';
  };

  const handleEdit = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setShowModal(true);
  };

  const handleAdd = () => {
    navigate('/books?reserve=1', { state: { reserveMode: true } });
  };

  const handleConfirm = async (id: string) => {
    setProcessingId(id);
    setError('');
    try {
      await confirmReservation(id);
    } catch (err) {
      setError('No hay copias disponibles para confirmar esta reserva.');
    } finally {
      setProcessingId(null);
    }
  };

  const handleCancel = async (id: string) => {
    setProcessingId(id);
    setError('');
    await cancelReservation(id);
    setProcessingId(null);
  };

  const handleCreateLoan = async (reservation: Reservation) => {
    setProcessingId(reservation.id);
    setError('');
    try {
      await convertReservationToLoan(reservation.id, user?.id || 'system');
    } catch (err) {
      setError('No se pudo crear el préstamo desde la reserva.');
    } finally {
      setProcessingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    setProcessingId(id);
    setError('');
    await deleteReservation(id);
    setProcessingId(null);
  };

  const getStatusBadge = (status: string) => {
    const statusMap: { [key: string]: { bg: string; text: string } } = {
      pending: { bg: 'warning', text: 'Pendiente' },
      confirmed: { bg: 'info', text: 'Confirmada' },
      completed: { bg: 'success', text: 'Completada' },
      cancelled: { bg: 'danger', text: 'Cancelada' },
      expired: { bg: 'secondary', text: 'Expirada' }
    };
    const statusInfo = statusMap[status] || { bg: 'secondary', text: status };
    return <Badge bg={statusInfo.bg}>{statusInfo.text}</Badge>;
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>📋 {role === 'member' ? 'Mis Reservas' : 'Gestión de Reservas'}</h2>
          <p className="text-muted">
            {role === 'member' 
              ? 'Consulta el estado de tus reservas de libros'
              : 'Administra las reservas de libros de la biblioteca'}
          </p>
        </div>
        <div className="d-flex gap-2">
          {role !== 'member' && (
            <Button variant="outline-secondary" onClick={() => navigate('/books')}>
              <i className="bi bi-journal-text me-2"></i>
              Gestión de Libros
            </Button>
          )}
          <Button variant="primary" onClick={handleAdd}>
            <i className="bi bi-plus-circle me-2"></i>
            Nueva Reserva
          </Button>
        </div>
      </div>

      <Card>
        <Card.Body>
          {error && (
            <Alert variant="danger" onClose={() => setError('')} dismissible>
              {error}
            </Alert>
          )}
          <Table responsive hover>
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Libro</th>
                {role !== 'member' && <th>Miembro</th>}
                <th>Fecha de Reserva</th>
                <th>Fecha de Expiración</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {displayReservations.map((reservation: Reservation) => (
                <tr key={reservation.id}>
                  <td><code>#{reservation.groupCode || reservation.id}</code></td>
                  <td>{getBookTitle(reservation.bookId)}</td>
                  {role !== 'member' && <td>{getMemberName(reservation.memberId)}</td>}
                  <td>{new Date(reservation.reservationDate).toLocaleDateString()}</td>
                  <td>{new Date(reservation.expirationDate).toLocaleDateString()}</td>
                  <td>{getStatusBadge(reservation.status)}</td>
                  <td>
                    <ButtonGroup size="sm">
                      <Button
                        variant="outline-info"
                        onClick={() => setDetailReservation(reservation)}
                      >
                        Ver
                      </Button>
                      {hasPermission('canManageReservations') ? (
                        <>
                          {reservation.status === 'pending' && (
                            <Button
                              variant="outline-success"
                              onClick={() => handleConfirm(reservation.id)}
                              disabled={processingId === reservation.id}
                            >
                              {processingId === reservation.id ? <Spinner size="sm" animation="border" /> : 'Confirmar'}
                            </Button>
                          )}
                          {reservation.status === 'confirmed' && (
                            <Button
                              variant="outline-primary"
                              onClick={() => handleCreateLoan(reservation)}
                              disabled={processingId === reservation.id}
                            >
                              {processingId === reservation.id ? <Spinner size="sm" animation="border" /> : 'Crear préstamo'}
                            </Button>
                          )}
                          {reservation.status !== 'completed' && (
                            <Button
                              variant="outline-danger"
                              onClick={() => handleCancel(reservation.id)}
                              disabled={processingId === reservation.id}
                            >
                              Cancelar
                            </Button>
                          )}
                          {reservation.status !== 'completed' && (
                            <Button
                              variant="outline-secondary"
                              onClick={() => {
                                if (window.confirm('¿Eliminar esta reserva?')) {
                                  handleDelete(reservation.id);
                                }
                              }}
                              disabled={processingId === reservation.id}
                            >
                              Eliminar
                            </Button>
                          )}
                          <Button
                            variant="outline-secondary"
                            onClick={() => handleEdit(reservation)}
                          >
                            <i className="bi bi-pencil"></i>
                          </Button>
                        </>
                      ) : (
                        role === 'member' && reservation.status === 'pending' && (
                          <Button
                            variant="outline-danger"
                            onClick={() => handleCancel(reservation.id)}
                            disabled={processingId === reservation.id}
                          >
                            {processingId === reservation.id ? 'Cancelando...' : 'Cancelar'}
                          </Button>
                        )
                      )}
                    </ButtonGroup>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {displayReservations.length === 0 && (
            <div className="text-center py-5 text-muted">
              <i className="bi bi-inbox" style={{ fontSize: '3rem' }}></i>
              <p className="mt-3">No hay reservas registradas</p>
            </div>
          )}
        </Card.Body>
      </Card>

      {showModal && (
        <ReservationModal
          show={showModal}
          onHide={() => setShowModal(false)}
          reservation={selectedReservation}
        />
      )}

      {detailReservation && (
        <Modal show onHide={() => setDetailReservation(null)}>
          <Modal.Header closeButton>
            <Modal.Title>Detalle de Reserva</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ListGroup variant="flush">
              <ListGroup.Item><strong>Código:</strong> {detailReservation.groupCode || detailReservation.id}</ListGroup.Item>
              <ListGroup.Item><strong>Libro:</strong> {getBookTitle(detailReservation.bookId)}</ListGroup.Item>
              {role !== 'member' && (
                <ListGroup.Item><strong>Miembro:</strong> {getMemberName(detailReservation.memberId)}</ListGroup.Item>
              )}
              <ListGroup.Item><strong>Estado:</strong> {getStatusBadge(detailReservation.status)}</ListGroup.Item>
              <ListGroup.Item><strong>Reserva:</strong> {new Date(detailReservation.reservationDate).toLocaleString()}</ListGroup.Item>
              <ListGroup.Item><strong>Expira:</strong> {new Date(detailReservation.expirationDate).toLocaleString()}</ListGroup.Item>
              {detailReservation.groupCode && (
                <ListGroup.Item className="text-muted small">Lote de reserva: {detailReservation.groupCode}</ListGroup.Item>
              )}
            </ListGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setDetailReservation(null)}>Cerrar</Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default ReservationsPage;
