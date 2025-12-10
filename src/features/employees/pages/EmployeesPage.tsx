import { useState } from 'react';
import { Card, Table, Button, Badge } from 'react-bootstrap';
import { useData } from '../../../shared/context/DataContext';
import { usePermissions } from '../../../shared/hooks/usePermissions';
import { Employee } from '../../../shared/types';
import EmployeeModal from '../components/EmployeeModal';

const EmployeesPage = () => {
  const { employees } = useData();
  const { hasPermission } = usePermissions();
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const handleEdit = (employee: Employee) => {
    setSelectedEmployee(employee);
    setShowModal(true);
  };

  const handleAdd = () => {
    setSelectedEmployee(null);
    setShowModal(true);
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>👔 Gestión de Empleados</h2>
          <p className="text-muted">Administra el personal de la biblioteca</p>
        </div>
        {hasPermission('canManageUsers') && (
          <Button variant="primary" onClick={handleAdd}>
            <i className="bi bi-plus-circle me-2"></i>
            Nuevo Empleado
          </Button>
        )}
      </div>

      <Card>
        <Card.Body>
          <Table responsive hover>
            <thead className="table-light">
              <tr>
                <th>Nombre Completo</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>Cargo</th>
                <th>Fecha de Contratación</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee: Employee) => (
                <tr key={employee.id}>
                  <td><strong>{employee.fullName}</strong></td>
                  <td>{employee.email}</td>
                  <td>{employee.phone}</td>
                  <td>
                    <Badge bg="info">{employee.position}</Badge>
                  </td>
                  <td>{new Date(employee.hireDate).toLocaleDateString()}</td>
                  <td>
                    <Badge bg={employee.active ? 'success' : 'danger'}>
                      {employee.active ? 'Activo' : 'Inactivo'}
                    </Badge>
                  </td>
                  <td>
                    {hasPermission('canManageUsers') && (
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => handleEdit(employee)}
                      >
                        <i className="bi bi-pencil"></i>
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {employees.length === 0 && (
            <div className="text-center py-5 text-muted">
              <i className="bi bi-inbox" style={{ fontSize: '3rem' }}></i>
              <p className="mt-3">No hay empleados registrados</p>
            </div>
          )}
        </Card.Body>
      </Card>

      {showModal && (
        <EmployeeModal
          show={showModal}
          onHide={() => setShowModal(false)}
          employee={selectedEmployee}
        />
      )}
    </>
  );
};

export default EmployeesPage;
