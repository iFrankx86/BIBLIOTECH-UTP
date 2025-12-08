import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (login(username, password)) {
      navigate('/dashboard');
    } else {
      setError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <Container fluid className="vh-100 d-flex align-items-center justify-content-center bg-light">
      <Row className="w-100">
        <Col md={6} lg={4} className="mx-auto">
          <Card className="shadow">
            <Card.Body className="p-5">
              <div className="text-center mb-4">
                <i className="bi bi-book-fill text-primary" style={{ fontSize: '3rem' }}></i>
                <h2 className="mt-3 mb-2">BiblioTech</h2>
                <p className="text-muted">Sistema de Gestión de Biblioteca</p>
              </div>

              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="username">
                  <Form.Label>Usuario</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingrese su usuario"
                    value={username}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Ingrese su contraseña"
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100 mb-3">
                  Iniciar Sesión
                </Button>
              </Form>

              <Card className="bg-light mt-4">
                <Card.Body className="p-3">
                  <p className="text-muted mb-2 small"><strong>Usuarios de prueba:</strong></p>
                  <p className="mb-1 small">👤 Admin: <code>admin / admin123</code></p>
                  <p className="mb-1 small">👤 Bibliotecario: <code>librarian / lib123</code></p>
                  <p className="mb-0 small">👤 Miembro: <code>member / mem123</code></p>
                </Card.Body>
              </Card>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
