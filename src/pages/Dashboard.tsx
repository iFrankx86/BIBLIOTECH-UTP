import { Row, Col, Card } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { useState } from 'react';
import BookModal from '../components/modals/BookModal';
import LoanModal from '../components/modals/LoanModal';
import MemberModal from '../components/modals/MemberModal';


const Dashboard = () => {
  const { user } = useAuth();
  const { books, members, loans, reservations, fines } = useData();
  
  const [showBookModal, setShowBookModal] = useState(false);
  const [showLoanModal, setShowLoanModal] = useState(false);
  const [showMemberModal, setShowMemberModal] = useState(false);

  const availableBooks = books.reduce((sum, book) => sum + book.availableCopies, 0);
  const activeLoans = loans.filter(loan => loan.status === 'active').length;
  const overdueLoans = loans.filter(loan => loan.status === 'overdue').length;
  const pendingFines = fines.filter(fine => fine.status === 'pending').length;

  const currentHour = new Date().getHours();
  let greeting = 'Buenos días';
  if (currentHour >= 12 && currentHour < 19) greeting = 'Buenas tardes';
  if (currentHour >= 19) greeting = 'Buenas noches';

  return (
    <>
      <div className="mb-4">
        <h2 className="mb-1">{greeting}, {user?.fullName}!</h2>
        <p className="text-muted">Bienvenido al Sistema de Gestión BiblioTech</p>
      </div>

      <Row className="mb-4">
        <Col md={3} className="mb-3">
          <Card className="h-100 border-primary">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-1">Total de Libros</h6>
                  <h2 className="mb-0">{books.length}</h2>
                  <small className="text-success">📚 {availableBooks} disponibles</small>
                </div>
                <i className="bi bi-book-fill text-primary" style={{ fontSize: '3rem', opacity: 0.3 }}></i>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3} className="mb-3">
          <Card className="h-100 border-success">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-1">Miembros</h6>
                  <h2 className="mb-0">{members.length}</h2>
                  <small className="text-success">👥 Activos</small>
                </div>
                <i className="bi bi-people-fill text-success" style={{ fontSize: '3rem', opacity: 0.3 }}></i>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3} className="mb-3">
          <Card className="h-100 border-warning">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-1">Préstamos Activos</h6>
                  <h2 className="mb-0">{activeLoans}</h2>
                  <small className="text-warning">⚠️ {overdueLoans} vencidos</small>
                </div>
                <i className="bi bi-arrow-left-right text-warning" style={{ fontSize: '3rem', opacity: 0.3 }}></i>
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
                  <h2 className="mb-0">{pendingFines}</h2>
                  <small className="text-danger">💰 Por cobrar</small>
                </div>
                <i className="bi bi-exclamation-triangle-fill text-danger" style={{ fontSize: '3rem', opacity: 0.3 }}></i>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={6} className="mb-3">
          <Card>
            <Card.Header className="bg-primary text-white">
              <h5 className="mb-0"><i className="bi bi-graph-up me-2"></i>Acciones Rápidas</h5>
            </Card.Header>
            <Card.Body>
              <div className="d-grid gap-2">
                <button 
                  className="btn btn-outline-primary text-start"
                  onClick={() => setShowBookModal(true)}
                >
                  <i className="bi bi-book me-2"></i>Registrar Nuevo Libro
                </button>
                <button 
                  className="btn btn-outline-success text-start"
                  onClick={() => setShowLoanModal(true)}
                >
                  <i className="bi bi-arrow-right-circle me-2"></i>Registrar Préstamo
                </button>
                <button 
                  className="btn btn-outline-info text-start"
                  onClick={() => setShowMemberModal(true)}
                >
                  <i className="bi bi-person-plus me-2"></i>Agregar Miembro
                </button>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} className="mb-3">
          <Card>
            <Card.Header className="bg-info text-white">
              <h5 className="mb-0"><i className="bi bi-info-circle me-2"></i>Información del Sistema</h5>
            </Card.Header>
            <Card.Body>
              <ul className="list-unstyled mb-0">
                <li className="mb-2">
                  <i className="bi bi-check-circle text-success me-2"></i>
                  <strong>Reservas pendientes:</strong> {reservations.filter(r => r.status === 'pending').length}
                </li>
                <li className="mb-2">
                  <i className="bi bi-check-circle text-success me-2"></i>
                  <strong>Sistema multiventana:</strong> Activo ✓
                </li>
                <li className="mb-2">
                  <i className="bi bi-check-circle text-success me-2"></i>
                  <strong>Versión:</strong> 1.0.0
                </li>
                <li className="mb-0">
                  <i className="bi bi-check-circle text-success me-2"></i>
                  <strong>Usuario actual:</strong> {user?.role}
                </li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card className="border-0 bg-light">
            <Card.Body className="text-center py-4">
              <i className="bi bi-book-half text-primary" style={{ fontSize: '4rem' }}></i>
              <h4 className="mt-3 mb-2">Sistema BiblioTech</h4>
              <p className="text-muted mb-0">
                Gestión completa de biblioteca con 12 clases de dominio y funcionalidad multiventana
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Modales multiventana */}
      <BookModal show={showBookModal} onHide={() => setShowBookModal(false)} />
      <LoanModal show={showLoanModal} onHide={() => setShowLoanModal(false)} />
      <MemberModal show={showMemberModal} onHide={() => setShowMemberModal(false)} />
    </>
  );
};

export default Dashboard;
