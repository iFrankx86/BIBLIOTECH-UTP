import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { usePermissions } from '../hooks/usePermissions';
import { Alert } from 'react-bootstrap';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredPermission?: keyof ReturnType<typeof usePermissions>['permissions'];
  allowedRoles?: ('admin' | 'librarian' | 'member')[];
  redirectTo?: string;
}

export const ProtectedRoute = ({ 
  children, 
  requiredPermission,
  allowedRoles,
  redirectTo = '/' 
}: ProtectedRouteProps) => {
  const { hasPermission, role } = usePermissions();

  // Verificar por roles permitidos
  if (allowedRoles && !allowedRoles.includes(role as 'admin' | 'librarian' | 'member')) {
    return (
      <div className="container mt-5">
        <Alert variant="danger">
          <Alert.Heading>
            <i className="bi bi-shield-exclamation me-2"></i>
            Acceso Denegado
          </Alert.Heading>
          <p>No tienes permisos para acceder a esta página.</p>
          <hr />
          <p className="mb-0">
            Tu rol actual: <strong>{role}</strong>
          </p>
        </Alert>
      </div>
    );
  }

  // Verificar por permiso específico
  if (requiredPermission && !hasPermission(requiredPermission)) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
};
