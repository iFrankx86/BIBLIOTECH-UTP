import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './app/shared/context/AuthContext';
import { DataProvider } from './app/shared/context/DataContext';
import PrivateRoute from './app/shared/components/PrivateRoute';
import { ProtectedRoute } from './app/shared/components/ProtectedRoute';
import Layout from './app/shared/components/Layout';
import Login from './app/features/auth/Login';
import Dashboard from './app/features/dashboard/Dashboard';
import BooksPage from './app/features/books/BooksPage';
import MembersPage from './app/features/members/MembersPage';
import LoansPage from './app/features/loans/LoansPage';
import CategoriesPage from './app/features/categories/CategoriesPage';
import AuthorsPage from './app/features/authors/AuthorsPage';
import PublishersPage from './app/features/publishers/PublishersPage';
import EmployeesPage from './app/features/employees/EmployeesPage';
import ReservationsPage from './app/features/reservations/ReservationsPage';
import FinesPage from './app/features/fines/FinesPage';
import InventoryPage from './app/features/inventory/InventoryPage';
import SuppliersPage from './app/features/suppliers/SuppliersPage';
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
