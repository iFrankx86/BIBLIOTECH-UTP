import { useState } from 'react';
import { Card, Table, Button, Badge } from 'react-bootstrap';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { usePermissions } from '../hooks/usePermissions';
import { Reservation, Book, Member } from '../models';
import ReservationModal from '../components/modals/ReservationModal';

const ReservationsPage = () => {
  const { reservations, books, members } = useData();
  const { user } = useAuth();
  const { hasPermission, role } = usePermissions();
  const [showModal, setShowModal] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);

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

  const getStatusBadge = (status: string) => {
    const statusMap: { [key: string]: { bg: string; text: string } } = {
      pending: { bg: 'warning', text: 'Pendiente' },
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
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => handleEdit(reservation)}
                      >
                        <i className="bi bi-pencil"></i>
                      </Button>
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
