import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import PrivateRoute from './components/PrivateRoute';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import BooksPage from './pages/BooksPage';
import MembersPage from './pages/MembersPage';
import LoansPage from './pages/LoansPage';
import CategoriesPage from './pages/CategoriesPage';
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
              <Route path="books" element={<BooksPage />} />
              <Route path="members" element={<MembersPage />} />
              <Route path="loans" element={<LoansPage />} />
              <Route path="categories" element={<CategoriesPage />} />
              <Route path="authors" element={<div className="text-center py-5"><h3>Página de Autores</h3><p className="text-muted">En desarrollo</p></div>} />
              <Route path="publishers" element={<div className="text-center py-5"><h3>Página de Editoriales</h3><p className="text-muted">En desarrollo</p></div>} />
              <Route path="employees" element={<div className="text-center py-5"><h3>Página de Empleados</h3><p className="text-muted">En desarrollo</p></div>} />
              <Route path="reservations" element={<div className="text-center py-5"><h3>Página de Reservas</h3><p className="text-muted">En desarrollo</p></div>} />
              <Route path="fines" element={<div className="text-center py-5"><h3>Página de Multas</h3><p className="text-muted">En desarrollo</p></div>} />
              <Route path="inventory" element={<div className="text-center py-5"><h3>Página de Inventario</h3><p className="text-muted">En desarrollo</p></div>} />
              <Route path="suppliers" element={<div className="text-center py-5"><h3>Página de Proveedores</h3><p className="text-muted">En desarrollo</p></div>} />
            </Route>
          </Routes>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
