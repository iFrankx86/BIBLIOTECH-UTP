import { Card, Table, Badge } from 'react-bootstrap';
import { useData } from '../context/DataContext';

const LoansPage = () => {
  const { loans, books, members } = useData();

  const getBookTitle = (bookId: string) => {
    const book = books.find(b => b.id === bookId);
    return book ? book.title : 'Libro no encontrado';
  };

  const getMemberName = (memberId: string) => {
    const member = members.find(m => m.id === memberId);
    return member ? member.fullName : 'Miembro no encontrado';
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
              </tr>
            </thead>
            <tbody>
              {loans.map((loan) => (
                <tr key={loan.id}>
                  <td><code>#{loan.id}</code></td>
                  <td>{getBookTitle(loan.bookId)}</td>
                  <td>{getMemberName(loan.memberId)}</td>
                  <td>{loan.loanDate.toLocaleDateString()}</td>
                  <td>{loan.dueDate.toLocaleDateString()}</td>
                  <td>{loan.returnDate ? loan.returnDate.toLocaleDateString() : '-'}</td>
                  <td>
                    <Badge bg={
                      loan.status === 'returned' ? 'success' :
                      loan.status === 'overdue' ? 'danger' : 'warning'
                    }>
                      {loan.status === 'active' ? 'Activo' :
                       loan.status === 'returned' ? 'Devuelto' : 'Vencido'}
                    </Badge>
                  </td>
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
    </>
  );
};

export default LoansPage;
