import { Card, Table, Badge, Button, Modal, ListGroup, Form, InputGroup } from 'react-bootstrap';
import { useState } from 'react';
import { useData } from '../../shared/context/DataContext';
import { usePermissions } from '../../shared/hooks/usePermissions';
import { Loan, Book, Member } from '../../shared/types';
import LoanModal from './LoanModal';

const LoansPage = () => {
  const { loans, books, members, confirmReturn, deleteLoan } = useData();
  const { hasPermission } = usePermissions();

  const [detailLoan, setDetailLoan] = useState<Loan | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAdd = () => {
    setSelectedLoan(null);
    setShowModal(true);
  };

  const handleEdit = (loan: Loan) => {
    setSelectedLoan(loan);
    setShowModal(true);
  };

  const handleDelete = async (loan: Loan) => {
    const confirmed = window.confirm(`¿Eliminar el préstamo #${loan.id}? Esta acción no se puede deshacer.`);
    if (!confirmed) return;
    await deleteLoan(loan.id);
  };

  const getBookTitle = (bookId: string) => {
    const book = books.find((b: Book) => b.id === bookId);
    return book ? book.title : 'Libro no encontrado';
  };

  const getMemberName = (memberId: string) => {
    const member = members.find((m: Member) => m.id === memberId);
    return member ? member.fullName : 'Miembro no encontrado';
  };

  const getDisplayStatus = (loan: Loan) => {
    const isReturned = loan.status === 'returned';
    const isOverdue = !isReturned && new Date() > new Date(loan.dueDate);
    if (isReturned) return { label: 'Devuelto', variant: 'success' };
    if (isOverdue || loan.status === 'overdue') return { label: 'No devuelto (vencido)', variant: 'danger' };
    return { label: 'No devuelto', variant: 'warning' };
  };

  // Filtrar préstamos por término de búsqueda
  const filteredLoans = loans.filter((loan: Loan) => {
    if (!searchTerm) return true;
    const bookTitle = getBookTitle(loan.bookId).toLowerCase();
    const memberName = getMemberName(loan.memberId).toLowerCase();
    const term = searchTerm.toLowerCase();
    return bookTitle.includes(term) || memberName.includes(term);
  });

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>📖 Gestión de Préstamos</h2>
          <p className="text-muted">Administra los préstamos de libros</p>
        </div>
        {hasPermission('canManageLoans') && (
          <Button variant="primary" onClick={handleAdd}>
            <i className="bi bi-plus-circle me-2"></i>
            Nuevo Préstamo
          </Button>
        )}
      </div>

      <Card>
        <Card.Body>
          <InputGroup className="mb-3">
            <InputGroup.Text>
              <i className="bi bi-search"></i>
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Buscar por libro o miembro..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <Button variant="outline-secondary" onClick={() => setSearchTerm('')}>
                <i className="bi bi-x-circle"></i>
              </Button>
            )}
          </InputGroup>

          {filteredLoans.length === 0 && searchTerm && (
            <div className="text-center text-muted my-4">
              <i className="bi bi-search" style={{ fontSize: '2rem' }}></i>
              <p className="mt-2">No se encontraron préstamos que coincidan con "{searchTerm}"</p>
            </div>
          )}

          <Table responsive hover>
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Libro</th>
                <th>Miembro</th>
                <th>Fecha de Préstamo</th>
                <th>Fecha de Vencimiento</th>
                <th>Fecha de Devolución</th>
                <th>Estado</th>
                {hasPermission('canManageLoans') && <th>Acciones</th>}
              </tr>
            </thead>
            <tbody>
              {filteredLoans.map((loan: Loan) => (
                <tr key={loan.id}>
                  <td><code>#{loan.id}</code></td>
                  <td>{getBookTitle(loan.bookId)}</td>
                  <td>{getMemberName(loan.memberId)}</td>
                  <td>{new Date(loan.loanDate).toLocaleDateString()}</td>
                  <td>{new Date(loan.dueDate).toLocaleDateString()}</td>
                  <td>{loan.returnDate ? new Date(loan.returnDate).toLocaleDateString() : '-'}</td>
                  <td>
                    {(() => {
                      const status = getDisplayStatus(loan);
                      return <Badge bg={status.variant}>{status.label}</Badge>;
                    })()}
                  </td>
                  {hasPermission('canManageLoans') && (
                    <td className="d-flex gap-2">
                      <Button
                        size="sm"
                        variant="outline-info"
                        onClick={() => setDetailLoan(loan)}
                      >
                        Ver
                      </Button>
                      <Button
                        size="sm"
                        variant="outline-primary"
                        onClick={() => handleEdit(loan)}
                      >
                        Editar
                      </Button>
                      {loan.status !== 'returned' && (
                        <Button
                          size="sm"
                          variant="outline-success"
                          onClick={async () => { await confirmReturn(loan.id); }}
                        >
                          Confirmar devolución
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="outline-danger"
                        onClick={() => handleDelete(loan)}
                      >
                        Eliminar
                      </Button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </Table>
          {loans.length === 0 && (
            <div className="text-center py-5 text-muted">
              <i className="bi bi-inbox" style={{ fontSize: '3rem' }}></i>
              <p className="mt-3">No hay préstamos registrados</p>
            </div>
          )}
        </Card.Body>
      </Card>

      {detailLoan && (
        <Modal show onHide={() => setDetailLoan(null)}>
          <Modal.Header closeButton>
            <Modal.Title>Detalle de Préstamo</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ListGroup variant="flush">
              <ListGroup.Item><strong>ID:</strong> {detailLoan.id}</ListGroup.Item>
              <ListGroup.Item><strong>Libro:</strong> {getBookTitle(detailLoan.bookId)}</ListGroup.Item>
              <ListGroup.Item><strong>Miembro:</strong> {getMemberName(detailLoan.memberId)}</ListGroup.Item>
              <ListGroup.Item><strong>Préstamo:</strong> {new Date(detailLoan.loanDate).toLocaleString()}</ListGroup.Item>
              <ListGroup.Item><strong>Vence:</strong> {new Date(detailLoan.dueDate).toLocaleString()}</ListGroup.Item>
              <ListGroup.Item><strong>Devolución:</strong> {detailLoan.returnDate ? new Date(detailLoan.returnDate).toLocaleString() : 'Pendiente'}</ListGroup.Item>
              {detailLoan.reservationId && (
                <ListGroup.Item className="text-muted small">Origen: Reserva #{detailLoan.reservationId}</ListGroup.Item>
              )}
            </ListGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setDetailLoan(null)}>Cerrar</Button>
          </Modal.Footer>
        </Modal>
      )}

      {showModal && (
        <LoanModal
          show={showModal}
          onHide={() => { setShowModal(false); setSelectedLoan(null); }}
          loan={selectedLoan || undefined}
        />
      )}
    </>
  );
};

export default LoansPage;
