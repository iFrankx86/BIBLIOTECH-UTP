import { useState } from 'react';
import { Card, Table, Button, Badge } from 'react-bootstrap';
import { useData } from '../../shared/context/DataContext';
import { usePermissions } from '../../shared/hooks/usePermissions';
import { Employee } from '../../shared/types';
import EmployeeModal from './EmployeeModal';

const EmployeesPage = () => {
  const { employees, updateEmployee, deleteEmployee } = useData();
  const { hasPermission } = usePermissions();
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const handleToggleActive = async (employee: Employee) => {
    const updated = new Employee(
      employee.id,
      employee.firstName,
      employee.lastName,
      employee.email,
      employee.phone,
      employee.position,
      employee.department,
      new Date(employee.hireDate),
      employee.salary,
      !employee.active,
      employee.idNumber
    );
    if (employee.userId) updated.userId = employee.userId;
    await updateEmployee(updated);
  };

  const handleDelete = async (employee: Employee) => {
    const confirmed = window.confirm(`¿Eliminar al empleado ${employee.fullName}? Esta acción no se puede deshacer.`);
    if (!confirmed) return;
    await deleteEmployee(employee.id);
  };

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
                  <td className="d-flex gap-2">
                    {hasPermission('canManageUsers') && (
                      <>
                        <Button
                          variant={employee.active ? 'outline-success' : 'outline-secondary'}
                          size="sm"
                          title={employee.active ? 'Desactivar empleado' : 'Activar empleado'}
                          onClick={() => handleToggleActive(employee)}
                        >
                          <i className={employee.active ? 'bi bi-toggle-on' : 'bi bi-toggle-off'}></i>
                        </Button>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => handleEdit(employee)}
                        >
                          <i className="bi bi-pencil"></i>
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleDelete(employee)}
                        >
                          <i className="bi bi-trash"></i>
                        </Button>
                      </>
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
