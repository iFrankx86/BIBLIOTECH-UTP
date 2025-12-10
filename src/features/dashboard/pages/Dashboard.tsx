import { Row, Col, Card } from 'react-bootstrap';
import { useAuth } from '../../auth/context/AuthContext';

import { useState } from 'react';
import { usePermissions } from '../../../shared/hooks/usePermissions';
import BookModal from '../../books/components/BookModal';
import MemberModal from '../../members/components/MemberModal';
import MemberDashboard from './MemberDashboard';
import { Book, Loan, Fine, Reservation } from '../../../shared/types';
import { useData } from '../../../shared/context/DataContext';
import { useNavigate } from 'react-router-dom';


const Dashboard = () => {
  const { user } = useAuth();
  const { hasPermission, role } = usePermissions();
  const { books, members, loans, reservations, fines } = useData();
  const navigate = useNavigate();
  
  const [showBookModal, setShowBookModal] = useState(false);
  const [showMemberModal, setShowMemberModal] = useState(false);

  // Si es miembro, mostrar dashboard específico para miembros
  if (role === 'member') {
    return <MemberDashboard />;
  }

  const availableBooks = books.reduce((sum: number, book: Book) => sum + book.availableCopies, 0);
  const activeLoans = loans.filter((loan: Loan) => loan.status !== 'returned').length;
  const overdueLoans = loans.filter((loan: Loan) => loan.status === 'overdue' || (!loan.returnDate && new Date() > new Date(loan.dueDate))).length;
  const pendingFines = fines.filter((fine: Fine) => fine.status === 'pending').length;

  const currentHour = new Date().getHours();
  let greeting = 'Buenos días';
  if (currentHour >= 12 && currentHour < 19) greeting = 'Buenas tardes';
  if (currentHour >= 19) greeting = 'Buenas noches';

  return (
    <>
      <div className="mb-4">
        <h2 className="mb-1">{greeting}, {user?.fullName}!</h2>
        <p className="text-muted">
          Bienvenido al Sistema de Gestión BiblioTech 
          {role === 'admin' && ' - Panel de Administrador'}
          {role === 'librarian' && ' - Panel de Bibliotecario'}
        </p>
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
                {hasPermission('canManageBooks') && (
                  <button 
                    className="btn btn-outline-primary text-start"
                    onClick={() => setShowBookModal(true)}
                  >
                    <i className="bi bi-book me-2"></i>Registrar Nuevo Libro
                  </button>
                )}
                {hasPermission('canManageLoans') && (
                  <button 
                    className="btn btn-outline-success text-start"
                    onClick={() => navigate('/loans')}
                  >
                    <i className="bi bi-arrow-right-circle me-2"></i>Registrar Préstamo
                  </button>
                )}
                {hasPermission('canManageMembers') && (
                  <button 
                    className="btn btn-outline-info text-start"
                    onClick={() => setShowMemberModal(true)}
                  >
                    <i className="bi bi-person-plus me-2"></i>Agregar Miembro
                  </button>
                )}
                {hasPermission('canManageReservations') && (
                  <button
                    className="btn btn-outline-secondary text-start"
                    onClick={() => navigate('/reservations')}
                  >
                    <i className="bi bi-bookmarks me-2"></i>Gestión de Reservas
                  </button>
                )}
                {hasPermission('canManageBooks') && (
                  <button
                    className="btn btn-outline-dark text-start"
                    onClick={() => navigate('/books')}
                  >
                    <i className="bi bi-journal-text me-2"></i>Gestión de Libros
                  </button>
                )}
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
                  <strong>Reservas pendientes:</strong> {reservations.filter((r: Reservation) => r.status === 'pending').length}
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
      <MemberModal show={showMemberModal} onHide={() => setShowMemberModal(false)} />
    </>
  );
};

export default Dashboard;
