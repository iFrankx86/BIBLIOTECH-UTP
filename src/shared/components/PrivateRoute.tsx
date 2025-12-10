import { Navigate } from 'react-router-dom';
import { useAuth } from '../../features/auth/context/AuthContext';
import { useData } from '../context/DataContext';
import { ReactNode } from 'react';
import Loading from './Loading';
import { Alert, Container } from 'react-bootstrap';

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { isAuthenticated } = useAuth();
  const { loading, error } = useData();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (loading) {
    return <Loading message="Cargando datos del sistema..." />;
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">
          <Alert.Heading>Error al cargar datos</Alert.Heading>
          <p>{error}</p>
          <hr />
          <p className="mb-0">
            <strong>Solución:</strong> Asegúrate de que json-server esté corriendo en el puerto 3001.
            <br />
            Ejecuta: <code>npm run server</code> en otra terminal.
          </p>
        </Alert>
      </Container>
    );
  }

  return <>{children}</>;
};

export default PrivateRoute;
