import { Card, Table, Badge, Button, Modal, ListGroup } from 'react-bootstrap';
import { useState } from 'react';
import { useData } from '../context/DataContext';
import { usePermissions } from '../hooks/usePermissions';
import { Loan, Book, Member } from '../models';

const LoansPage = () => {
  const { loans, books, members, confirmReturn } = useData();
  const { hasPermission } = usePermissions();

  const [detailLoan, setDetailLoan] = useState<Loan | null>(null);

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

  return (
    <>
      <div className="mb-4">
        <h2>📖 Gestión de Préstamos</h2>
        <p className="text-muted">Administra los préstamos de libros</p>
      </div>

      <Card>
        <Card.Body>
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
              {loans.map((loan: Loan) => (
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
                      {loan.status !== 'returned' && (
                        <Button
                          size="sm"
                          variant="outline-success"
                          onClick={async () => { await confirmReturn(loan.id); }}
                        >
                          Confirmar devolución
                        </Button>
                      )}
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
    </>
  );
};

export default LoansPage;
