import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Layout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
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
              
              <NavDropdown title={<><i className="bi bi-book me-1"></i>Libros</>} id="books-dropdown">
                <NavDropdown.Item as={Link} to="/books">Ver Libros</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/authors">Autores</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/publishers">Editoriales</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/categories">Categorías</NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title={<><i className="bi bi-people me-1"></i>Miembros</>} id="members-dropdown">
                <NavDropdown.Item as={Link} to="/members">Ver Miembros</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/employees">Empleados</NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title={<><i className="bi bi-arrow-left-right me-1"></i>Operaciones</>} id="operations-dropdown">
                <NavDropdown.Item as={Link} to="/loans">Préstamos</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/reservations">Reservas</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/fines">Multas</NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title={<><i className="bi bi-gear me-1"></i>Gestión</>} id="management-dropdown">
                <NavDropdown.Item as={Link} to="/inventory">Inventario</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/suppliers">Proveedores</NavDropdown.Item>
              </NavDropdown>
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
                  <small className="text-muted">Rol: {user?.role}</small>
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
