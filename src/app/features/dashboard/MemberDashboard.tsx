import { Row, Col, Card, Button, Table } from 'react-bootstrap';
import { useAuth } from '../../shared/context/AuthContext';
import { useData } from '../../shared/context/DataContext';
import { useNavigate } from 'react-router-dom';
import { Loan, Reservation, Fine, Book } from '../../shared/types';


const MemberDashboard = () => {
  const { user } = useAuth();
  const { loans, reservations, fines, books } = useData();
  const navigate = useNavigate();

  // Filtrar datos del miembro actual
  const myLoans = loans.filter((loan: Loan) => loan.memberId === user?.id);
  const myActiveLoans = myLoans.filter((loan: Loan) => loan.status === 'active');
  const myOverdueLoans = myLoans.filter((loan: Loan) => loan.status === 'overdue');
  const myReservations = reservations.filter((res: Reservation) => res.memberId === user?.id);
  const myFines = fines.filter((fine: Fine) => fine.memberId === user?.id);
  const myPendingFines = myFines.filter((fine: Fine) => fine.status === 'pending');
  
  const totalFineAmount = myPendingFines.reduce((sum: number, fine: Fine) => sum + fine.amount, 0);

  const currentHour = new Date().getHours();
  let greeting = 'Buenos días';
  if (currentHour >= 12 && currentHour < 19) greeting = 'Buenas tardes';
  if (currentHour >= 19) greeting = 'Buenas noches';

  return (
    <>
      <div className="mb-4">
        <h2 className="mb-1">{greeting}, {user?.fullName}!</h2>
        <p className="text-muted">Bienvenido a tu Panel de Miembro - BiblioTech</p>
      </div>

      {/* Estadísticas del Miembro */}
      <Row className="mb-4">
        <Col md={3} className="mb-3">
          <Card className="h-100 border-primary">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-1">Préstamos Activos</h6>
                  <h2 className="mb-0">{myActiveLoans.length}</h2>
                  <small className="text-primary">📖 En tu poder</small>
                </div>
                <i className="bi bi-book-fill text-primary" style={{ fontSize: '3rem', opacity: 0.3 }}></i>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3} className="mb-3">
          <Card className="h-100 border-warning">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-1">Préstamos Vencidos</h6>
                  <h2 className="mb-0">{myOverdueLoans.length}</h2>
                  <small className="text-warning">⚠️ Debes devolver</small>
                </div>
                <i className="bi bi-exclamation-circle-fill text-warning" style={{ fontSize: '3rem', opacity: 0.3 }}></i>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3} className="mb-3">
          <Card className="h-100 border-info">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-1">Mis Reservas</h6>
                  <h2 className="mb-0">{myReservations.length}</h2>
                  <small className="text-info">🔖 Pendientes</small>
                </div>
                <i className="bi bi-bookmark-fill text-info" style={{ fontSize: '3rem', opacity: 0.3 }}></i>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3} className="mb-3">
          <Card className="h-100 border-danger">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-1">Multas Pendientes</h6>
                  <h2 className="mb-0">${totalFineAmount.toFixed(2)}</h2>
                  <small className="text-danger">💰 Por pagar</small>
                </div>
                <i className="bi bi-cash text-danger" style={{ fontSize: '3rem', opacity: 0.3 }}></i>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        {/* Acciones Rápidas */}
        <Col md={4} className="mb-3">
          <Card className="h-100">
            <Card.Header className="bg-primary text-white">
              <h5 className="mb-0"><i className="bi bi-lightning-fill me-2"></i>Acciones Rápidas</h5>
            </Card.Header>
            <Card.Body>
              <div className="d-grid gap-2">
                <Button 
                  variant="outline-primary"
                  onClick={() => navigate('/books?reserve=1', { state: { reserveMode: true } })}
                >
                  <i className="bi bi-bookmark-plus me-2"></i>Hacer Reserva
                </Button>
                <Button 
                  variant="outline-info"
                  onClick={() => window.location.hash = '#/books'}
                >
                  <i className="bi bi-search me-2"></i>Explorar Catálogo
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Mis Préstamos Activos */}
        <Col md={8} className="mb-3">
          <Card className="h-100">
            <Card.Header className="bg-success text-white">
              <h5 className="mb-0"><i className="bi bi-book me-2"></i>Mis Préstamos Activos</h5>
            </Card.Header>
            <Card.Body style={{ maxHeight: '300px', overflowY: 'auto' }}>
              {myActiveLoans.length === 0 ? (
                <p className="text-muted text-center mb-0">No tienes préstamos activos</p>
              ) : (
                <Table striped bordered hover size="sm">
                  <thead>
                    <tr>
                      <th>Libro</th>
                      <th>Fecha Préstamo</th>
                      <th>Fecha Devolución</th>
                      <th>Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {myActiveLoans.map((loan: Loan) => {
                      const book = books.find((b: Book) => b.id === loan.bookId);
                      return (
                        <tr key={loan.id}>
                          <td>{book?.title || 'Desconocido'}</td>
                          <td>{new Date(loan.loanDate).toLocaleDateString()}</td>
                          <td>{new Date(loan.dueDate).toLocaleDateString()}</td>
                          <td>
                            <span className="badge bg-success">Activo</span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        {/* Mis Multas */}
        <Col md={6} className="mb-3">
          <Card>
            <Card.Header className="bg-danger text-white">
              <h5 className="mb-0"><i className="bi bi-exclamation-triangle me-2"></i>Mis Multas</h5>
            </Card.Header>
            <Card.Body style={{ maxHeight: '250px', overflowY: 'auto' }}>
              {myPendingFines.length === 0 ? (
                <p className="text-muted text-center mb-0">No tienes multas pendientes ✓</p>
              ) : (
                <Table striped bordered hover size="sm">
                  <thead>
                    <tr>
                      <th>Motivo</th>
                      <th>Monto</th>
                      <th>Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {myPendingFines.map((fine: Fine) => (
                      <tr key={fine.id}>
                        <td>{fine.reason}</td>
                        <td>${fine.amount.toFixed(2)}</td>
                        <td>
                          <span className="badge bg-danger">Pendiente</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Card.Body>
          </Card>
        </Col>

        {/* Historial de Préstamos */}
        <Col md={6} className="mb-3">
          <Card>
            <Card.Header className="bg-info text-white">
              <h5 className="mb-0"><i className="bi bi-clock-history me-2"></i>Historial de Préstamos</h5>
            </Card.Header>
            <Card.Body style={{ maxHeight: '250px', overflowY: 'auto' }}>
              {myLoans.length === 0 ? (
                <p className="text-muted text-center mb-0">No tienes historial de préstamos</p>
              ) : (
                <Table striped bordered hover size="sm">
                  <thead>
                    <tr>
                      <th>Libro</th>
                      <th>Fecha</th>
                      <th>Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {myLoans.slice(0, 5).map((loan: Loan) => {
                      const book = books.find((b: Book) => b.id === loan.bookId);
                      return (
                        <tr key={loan.id}>
                          <td>{book?.title || 'Desconocido'}</td>
                          <td>{new Date(loan.loanDate).toLocaleDateString()}</td>
                          <td>
                            <span className={`badge bg-${loan.status === 'active' ? 'success' : loan.status === 'returned' ? 'secondary' : 'warning'}`}>
                              {loan.status === 'active' ? 'Activo' : loan.status === 'returned' ? 'Devuelto' : 'Vencido'}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default MemberDashboard;
