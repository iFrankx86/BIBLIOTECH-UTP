import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { usePermissions } from '../hooks/usePermissions';

const Layout = () => {
  const { user, logout } = useAuth();
  const { hasPermission, role } = usePermissions();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const openWindow = (path: string) => {
    const url = `${window.location.origin}${path}`;
    // Abrir en nueva pestaña (sin especificar features para evitar popup window)
    window.open(url, '_blank', 'noopener');
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
        <Container fluid>
          <Navbar.Brand as={Link} to="/dashboard">
            <i className="bi bi-book-fill me-2"></i>
            BiblioTech
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/dashboard">
                <i className="bi bi-house-door me-1"></i>
                Dashboard
              </Nav.Link>
              
              {/* Menú de Libros - Todos pueden ver, Admin y Bibliotecario gestionan */}
              <NavDropdown title={<><i className="bi bi-book me-1"></i>Libros</>} id="books-dropdown">
                <NavDropdown.Item as={Link} to="/books">
                  {role === 'member' ? 'Catálogo de Libros' : 'Gestionar Libros'}
                </NavDropdown.Item>
                {hasPermission('canManageAuthors') && (
                  <NavDropdown.Item as={Link} to="/authors">Autores</NavDropdown.Item>
                )}
                {hasPermission('canManagePublishers') && (
                  <NavDropdown.Item as={Link} to="/publishers">Editoriales</NavDropdown.Item>
                )}
                {hasPermission('canManageCategories') && (
                  <NavDropdown.Item as={Link} to="/categories">Categorías</NavDropdown.Item>
                )}
              </NavDropdown>

              {/* Menú de Miembros - Solo Admin y Bibliotecario */}
              {hasPermission('canManageMembers') && (
                <NavDropdown title={<><i className="bi bi-people me-1"></i>Miembros</>} id="members-dropdown">
                  <NavDropdown.Item as={Link} to="/members">Gestionar Miembros</NavDropdown.Item>
                  {hasPermission('canManageUsers') && (
                    <NavDropdown.Item as={Link} to="/employees">Empleados</NavDropdown.Item>
                  )}
                </NavDropdown>
              )}

              {/* Menú de Operaciones */}
              <NavDropdown title={<><i className="bi bi-arrow-left-right me-1"></i>Operaciones</>} id="operations-dropdown">
                {hasPermission('canManageLoans') && (
                  <NavDropdown.Item as={Link} to="/loans">Gestionar Préstamos</NavDropdown.Item>
                )}
                <NavDropdown.Item as={Link} to="/reservations">
                  {role === 'member' ? 'Mis Reservas' : 'Gestionar Reservas'}
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/fines">
                  {role === 'member' ? 'Mis Multas' : 'Gestionar Multas'}
                </NavDropdown.Item>
              </NavDropdown>

              {/* Lanzador multiventana */}
              <NavDropdown title={<><i className="bi bi-columns-gap me-1"></i>Ventanas</>} id="multiwindow-dropdown">
                <NavDropdown.Item onClick={() => openWindow('/dashboard')}>Dashboard</NavDropdown.Item>
                <NavDropdown.Item onClick={() => openWindow('/books')}>Libros</NavDropdown.Item>
                <NavDropdown.Item onClick={() => openWindow('/loans')}>Préstamos</NavDropdown.Item>
                <NavDropdown.Item onClick={() => openWindow('/reservations')}>Reservas</NavDropdown.Item>
              </NavDropdown>

              {/* Menú de Gestión - Solo Admin */}
              {hasPermission('canManageSystem') && (
                <NavDropdown title={<><i className="bi bi-gear me-1"></i>Gestión</>} id="management-dropdown">
                  <NavDropdown.Item as={Link} to="/inventory">Inventario</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/suppliers">Proveedores</NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>

            <Nav>
              <NavDropdown 
                title={
                  <>
                    <i className="bi bi-person-circle me-1"></i>
                    {user?.fullName}
                  </>
                } 
                id="user-dropdown"
                align="end"
              >
                <NavDropdown.ItemText>
                  <small className="text-muted">
                    Rol: <strong>
                      {role === 'admin' && '👑 Administrador'}
                      {role === 'librarian' && '📚 Bibliotecario'}
                      {role === 'member' && '👤 Miembro'}
                    </strong>
                  </small>
                </NavDropdown.ItemText>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  <i className="bi bi-box-arrow-right me-1"></i>
                  Cerrar Sesión
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container fluid>
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;
