import { useState } from 'react';
import { Card, Table, Button, Badge, Alert, ButtonGroup, Spinner } from 'react-bootstrap';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { usePermissions } from '../hooks/usePermissions';
import { Reservation, Book, Member } from '../models';
import ReservationModal from '../components/modals/ReservationModal';

const ReservationsPage = () => {
  const { reservations, books, members, confirmReservation, cancelReservation, completeReservation, deleteReservation } = useData();
  const { user } = useAuth();
  const { hasPermission, role } = usePermissions();
  const [showModal, setShowModal] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
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
    setSelectedReservation(null);
    setShowModal(true);
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

  const handleComplete = async (id: string) => {
    setProcessingId(id);
    setError('');
    await completeReservation(id);
    setProcessingId(null);
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
        <Button variant="primary" onClick={handleAdd}>
          <i className="bi bi-plus-circle me-2"></i>
          Nueva Reserva
        </Button>
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
                {hasPermission('canManageReservations') && <th>Acciones</th>}
                {role === 'member' && <th>Acciones</th>}
              </tr>
            </thead>
            <tbody>
              {displayReservations.map((reservation: Reservation) => (
                <tr key={reservation.id}>
                  <td><code>#{reservation.id}</code></td>
                  <td>{getBookTitle(reservation.bookId)}</td>
                  {role !== 'member' && <td>{getMemberName(reservation.memberId)}</td>}
                  <td>{new Date(reservation.reservationDate).toLocaleDateString()}</td>
                  <td>{new Date(reservation.expirationDate).toLocaleDateString()}</td>
                  <td>{getStatusBadge(reservation.status)}</td>
                  {hasPermission('canManageReservations') && (
                    <td>
                      <ButtonGroup size="sm">
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
                            onClick={() => handleComplete(reservation.id)}
                            disabled={processingId === reservation.id}
                          >
                            {processingId === reservation.id ? <Spinner size="sm" animation="border" /> : 'Completar'}
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
                      </ButtonGroup>
                    </td>
                  )}
                  {role === 'member' && (
                    <td>
                      {reservation.status === 'pending' && (
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleCancel(reservation.id)}
                          disabled={processingId === reservation.id}
                        >
                          {processingId === reservation.id ? 'Cancelando...' : 'Cancelar'}
                        </Button>
                      )}
                    </td>
                  )}
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
    </>
  );
};

export default ReservationsPage;
