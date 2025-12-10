import { useState } from 'react';
import { Card, Table, Button, Badge } from 'react-bootstrap';
import { useData } from '../../shared/context/DataContext';
import { useAuth } from '../../shared/context/AuthContext';
import { usePermissions } from '../../shared/hooks/usePermissions';
import { Fine, Member } from '../../shared/types';
import FineModal from './FineModal';

const FinesPage = () => {
  const { fines, members } = useData();
  const { user } = useAuth();
  const { hasPermission, role } = usePermissions();
  const [showModal, setShowModal] = useState(false);
  const [selectedFine, setSelectedFine] = useState<Fine | null>(null);

  // Filtrar multas según el rol
  const displayFines = role === 'member'
    ? fines.filter((fine: Fine) => fine.memberId === user?.id)
    : fines;

  const getMemberName = (memberId: string) => {
    const member = members.find((m: Member) => m.id === memberId);
    return member ? member.fullName : 'Miembro no encontrado';
  };

  const handleEdit = (fine: Fine) => {
    setSelectedFine(fine);
    setShowModal(true);
  };

  const handleAdd = () => {
    setSelectedFine(null);
    setShowModal(true);
  };

  const totalPending = displayFines
    .filter((fine: Fine) => fine.status === 'pending')
    .reduce((sum: number, fine: Fine) => sum + fine.amount, 0);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>💰 {role === 'member' ? 'Mis Multas' : 'Gestión de Multas'}</h2>
          <p className="text-muted">
            {role === 'member' 
              ? 'Consulta tus multas pendientes y pagadas'
              : 'Administra las multas de los miembros'}
          </p>
        </div>
        <div className="d-flex gap-2 align-items-center">
          <div className="text-end me-3">
            <small className="text-muted">Total Pendiente</small>
            <h4 className="mb-0 text-danger">${totalPending.toFixed(2)}</h4>
          </div>
          {hasPermission('canManageFines') && (
            <Button variant="primary" onClick={handleAdd}>
              <i className="bi bi-plus-circle me-2"></i>
              Nueva Multa
            </Button>
          )}
        </div>
      </div>

      <Card>
        <Card.Body>
          <Table responsive hover>
            <thead className="table-light">
              <tr>
                <th>ID</th>
                {role !== 'member' && <th>Miembro</th>}
                <th>Motivo</th>
                <th>Monto</th>
                <th>Fecha de Emisión</th>
                <th>Fecha de Pago</th>
                <th>Estado</th>
                {hasPermission('canManageFines') && <th>Acciones</th>}
              </tr>
            </thead>
            <tbody>
              {displayFines.map((fine: Fine) => (
                <tr key={fine.id}>
                  <td><code>#{fine.id}</code></td>
                  {role !== 'member' && <td>{getMemberName(fine.memberId)}</td>}
                  <td>{fine.reason}</td>
                  <td>
                    <strong className="text-danger">${fine.amount?.toFixed(2) || '0.00'}</strong>
                  </td>
                  <td>{new Date(fine.issueDate).toLocaleDateString()}</td>
                  <td>
                    {fine.paymentDate 
                      ? new Date(fine.paymentDate).toLocaleDateString()
                      : <span className="text-muted">-</span>
                    }
                  </td>
                  <td>
                    <Badge bg={fine.status === 'paid' ? 'success' : 'danger'}>
                      {fine.status === 'paid' ? 'Pagada' : 'Pendiente'}
                    </Badge>
                  </td>
                  {hasPermission('canManageFines') && (
                    <td>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => handleEdit(fine)}
                      >
                        <i className="bi bi-pencil"></i>
                      </Button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </Table>
          {displayFines.length === 0 && (
            <div className="text-center py-5 text-muted">
              <i className="bi bi-inbox" style={{ fontSize: '3rem' }}></i>
              <p className="mt-3">
                {role === 'member' ? '¡No tienes multas! 🎉' : 'No hay multas registradas'}
              </p>
            </div>
          )}
        </Card.Body>
      </Card>

      {showModal && (
        <FineModal
          show={showModal}
          onHide={() => setShowModal(false)}
          fine={selectedFine}
        />
      )}
    </>
  );
};

export default FinesPage;
