import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './features/auth/context/AuthContext';
import { DataProvider } from './shared/context/DataContext';
import PrivateRoute from './shared/components/PrivateRoute';
import { ProtectedRoute } from './shared/components/ProtectedRoute';
import Layout from './shared/components/Layout';
import Login from './features/auth/pages/Login';
import Dashboard from './features/dashboard/pages/Dashboard';
import BooksPage from './features/books/pages/BooksPage';
import MembersPage from './features/members/pages/MembersPage';
import LoansPage from './features/loans/pages/LoansPage';
import CategoriesPage from './features/categories/pages/CategoriesPage';
import AuthorsPage from './features/authors/pages/AuthorsPage';
import PublishersPage from './features/publishers/pages/PublishersPage';
import EmployeesPage from './features/employees/pages/EmployeesPage';
import ReservationsPage from './features/reservations/pages/ReservationsPage';
import FinesPage from './features/fines/pages/FinesPage';
import InventoryPage from './features/inventory/pages/InventoryPage';
import SuppliersPage from './features/suppliers/pages/SuppliersPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './styles/App.css';

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Layout />
                </PrivateRoute>
              }
            >
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              
              {/* Rutas con permisos - Admin y Bibliotecario pueden gestionar libros */}
              <Route path="books" element={
                <ProtectedRoute allowedRoles={['admin', 'librarian', 'member']}>
                  <BooksPage />
                </ProtectedRoute>
              } />
              
              {/* Solo Admin y Bibliotecario pueden gestionar miembros */}
              <Route path="members" element={
                <ProtectedRoute allowedRoles={['admin', 'librarian']}>
                  <MembersPage />
                </ProtectedRoute>
              } />
              
              {/* Admin y Bibliotecario pueden gestionar préstamos */}
              <Route path="loans" element={
                <ProtectedRoute allowedRoles={['admin', 'librarian']}>
                  <LoansPage />
                </ProtectedRoute>
              } />
              
              {/* Admin y Bibliotecario pueden gestionar categorías */}
              <Route path="categories" element={
                <ProtectedRoute allowedRoles={['admin', 'librarian']}>
                  <CategoriesPage />
                </ProtectedRoute>
              } />
              
              {/* Admin y Bibliotecario pueden gestionar autores */}
              <Route path="authors" element={
                <ProtectedRoute allowedRoles={['admin', 'librarian']}>
                  <AuthorsPage />
                </ProtectedRoute>
              } />
              
              {/* Admin y Bibliotecario pueden gestionar editoriales */}
              <Route path="publishers" element={
                <ProtectedRoute allowedRoles={['admin', 'librarian']}>
                  <PublishersPage />
                </ProtectedRoute>
              } />
              
              {/* Solo Admin puede gestionar empleados */}
              <Route path="employees" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <EmployeesPage />
                </ProtectedRoute>
              } />
              
              {/* Todos pueden ver reservas (miembros las suyas, staff todas) */}
              <Route path="reservations" element={<ReservationsPage />} />
              
              {/* Admin y Bibliotecario gestionan multas, miembros ven las suyas */}
              <Route path="fines" element={<FinesPage />} />
              
              {/* Solo Admin puede gestionar inventario */}
              <Route path="inventory" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <InventoryPage />
                </ProtectedRoute>
              } />
              
              {/* Solo Admin puede gestionar proveedores */}
              <Route path="suppliers" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <SuppliersPage />
                </ProtectedRoute>
              } />
            </Route>
          </Routes>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
