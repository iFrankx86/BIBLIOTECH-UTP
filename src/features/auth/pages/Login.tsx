import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../../auth/context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [loading, setLoading] = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const quickLogin = async (user: string, pass: string) => {
    setUsername(user);
    setPassword(pass);
    setError('');
    setLoading(true);

    try {
      const success = await login(user, pass);
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Usuario o contraseña incorrectos');
      }
    } catch (err) {
      setError('Error al conectar con el servidor. Asegúrate de que json-server esté corriendo.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const success = await login(username, password);
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Usuario o contraseña incorrectos');
      }
    } catch (err) {
      setError('Error al conectar con el servidor. Asegúrate de que json-server esté corriendo.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setInfo('');
    setLoading(true);

    try {
      const result = await register({ fullName, username, email, password, idNumber, phone });
      if (result.ok) {
        setInfo('Registro exitoso. Redirigiendo...');
        navigate('/dashboard');
      } else {
        setError(result.message || 'No se pudo registrar');
      }
    } catch (err) {
      setError('Error al conectar con el servidor. Asegúrate de que json-server esté corriendo.');
    } finally {
      setLoading(false);
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

              {error && <Alert variant="danger" className="mb-3">{error}</Alert>}
              {info && <Alert variant="success" className="mb-3">{info}</Alert>}

              {isRegisterMode ? (
                <Form onSubmit={handleRegister}>
                  <Row>
                    <Col md={12}>
                      <Form.Group className="mb-3" controlId="fullName">
                        <Form.Label>Nombre completo</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Ej. Ana Pérez"
                          value={fullName}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFullName(e.target.value)}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="idNumber">
                        <Form.Label>N° Identificación</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Ej. 12345678-9"
                          value={idNumber}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setIdNumber(e.target.value)}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="phone">
                        <Form.Label>Teléfono</Form.Label>
                        <Form.Control
                          type="tel"
                          placeholder="Ej. +56912345678"
                          value={phone}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="correo@ejemplo.com"
                      value={email}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                      required
                    />
                    <Form.Text className="text-muted">
                      Correos @bibliotech.com se registran como Bibliotecario. Otros dominios serán rol Miembro.
                    </Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="username">
                    <Form.Label>Usuario</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Elige un usuario"
                      value={username}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Crea una contraseña"
                      value={password}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                      required
                      minLength={6}
                    />
                    <Form.Text className="text-muted">
                      Mínimo 6 caracteres
                    </Form.Text>
                  </Form.Group>

                  <Button variant="success" type="submit" className="w-100 mb-3" disabled={loading}>
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Registrando...
                      </>
                    ) : (
                      'Crear cuenta'
                    )}
                  </Button>
                </Form>
              ) : (
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

                  <Button variant="primary" type="submit" className="w-100 mb-3" disabled={loading}>
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Iniciando sesión...
                      </>
                    ) : (
                      'Iniciar Sesión'
                    )}
                  </Button>
                </Form>
              )}

              <Button
                variant="link"
                className="w-100 mb-3"
                onClick={() => {
                  setError('');
                  setInfo('');
                  setIsRegisterMode(!isRegisterMode);
                }}
              >
                {isRegisterMode ? '¿Ya tienes cuenta? Inicia sesión' : '¿Nuevo aquí? Crear cuenta'}
              </Button>

              <div className="mt-4">
                <p className="text-muted mb-3 text-center"><strong>Inicio Rápido:</strong></p>
                <Row className="g-2">
                  <Col md={4}>
                    <Card 
                      className="text-center cursor-pointer hover-shadow"
                      style={{ cursor: 'pointer', transition: 'all 0.3s' }}
                      onClick={() => quickLogin('admin', 'admin123')}
                    >
                      <Card.Body className="p-3">
                        <i className="bi bi-shield-lock-fill text-danger" style={{ fontSize: '2rem' }}></i>
                        <h6 className="mt-2 mb-1">Admin</h6>
                        <small className="text-muted">Acceso total</small>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={4}>
                    <Card 
                      className="text-center cursor-pointer hover-shadow"
                      style={{ cursor: 'pointer', transition: 'all 0.3s' }}
                      onClick={() => quickLogin('librarian', 'lib123')}
                    >
                      <Card.Body className="p-3">
                        <i className="bi bi-book-half text-primary" style={{ fontSize: '2rem' }}></i>
                        <h6 className="mt-2 mb-1">Bibliotecario</h6>
                        <small className="text-muted">Gestión general</small>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={4}>
                    <Card 
                      className="text-center cursor-pointer hover-shadow"
                      style={{ cursor: 'pointer', transition: 'all 0.3s' }}
                      onClick={() => quickLogin('member', 'mem123')}
                    >
                      <Card.Body className="p-3">
                        <i className="bi bi-person-circle text-success" style={{ fontSize: '2rem' }}></i>
                        <h6 className="mt-2 mb-1">Miembro</h6>
                        <small className="text-muted">Consulta</small>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
