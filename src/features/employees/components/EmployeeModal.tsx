import { Modal, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { useState } from 'react';
import { useData } from '../../../shared/context/DataContext';
import { Employee, User } from '../../../shared/types';
import { usersAPI } from '../../../shared/services/api';

interface EmployeeModalProps {
  show: boolean;
  onHide: () => void;
  employee?: Employee | null;
}

const EmployeeModal = ({ show, onHide, employee }: EmployeeModalProps) => {
  const { addEmployee, updateEmployee } = useData();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: employee?.firstName || '',
    lastName: employee?.lastName || '',
    idNumber: employee?.idNumber || '',
    email: employee?.email || '',
    phone: employee?.phone || '',
    position: employee?.position || '',
    department: employee?.department || 'circulation' as 'administration' | 'circulation' | 'cataloging' | 'reference' | 'maintenance',
    hireDate: employee?.hireDate ? new Date(employee.hireDate).toISOString().split('T')[0] : '',
    salary: employee?.salary || 0,
    username: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validar que las contraseñas coincidan solo al crear nuevo empleado
    if (!employee) {
      if (!formData.username || !formData.password) {
        setError('Usuario y contraseña son requeridos para nuevos empleados');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Las contraseñas no coinciden');
        return;
      }
      if (formData.password.length < 6) {
        setError('La contraseña debe tener al menos 6 caracteres');
        return;
      }
    }

    setLoading(true);
    
    try {
      const newEmployee = new Employee(
        employee?.id || Date.now().toString(),
        formData.firstName,
        formData.lastName,
        formData.email,
        formData.phone,
        formData.position,
        formData.department,
        new Date(formData.hireDate),
        formData.salary,
        true,
        formData.idNumber
      );

      if (employee) {
        await updateEmployee(newEmployee);
      } else {
        // Crear el empleado
        await addEmployee(newEmployee);
        
        // Crear el usuario asociado para login
        const newUser = new User(
          Date.now().toString(),
          formData.username,
          formData.password,
          formData.email,
          'librarian',
          `${formData.firstName} ${formData.lastName}`,
          true
        );
        
        await usersAPI.create(newUser);
        
        // Actualizar el empleado con el userId
        newEmployee.userId = newUser.id;
        await updateEmployee(newEmployee);
      }
      
      onHide();
    } catch (err) {
      setError('Error al guardar el empleado. Por favor intente nuevamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          <i className="bi bi-person-badge me-2"></i>
          {employee ? 'Editar Empleado' : 'Registrar Nuevo Empleado'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {error && <Alert variant="danger">{error}</Alert>}
          
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Nombre *</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Apellido *</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Número de Identificación *</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.idNumber}
                  onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })}
                  required
                  placeholder="Ej: 12345678-9"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Teléfono *</Form.Label>
                <Form.Control
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Email *</Form.Label>
            <Form.Control
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Cargo *</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Departamento *</Form.Label>
                <Form.Select
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value as 'administration' | 'circulation' | 'cataloging' | 'reference' | 'maintenance' })}
                  required
                >
                  <option value="administration">Administración</option>
                  <option value="circulation">Circulación</option>
                  <option value="cataloging">Catalogación</option>
                  <option value="reference">Referencia</option>
                  <option value="maintenance">Mantenimiento</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Fecha de Contratación *</Form.Label>
                <Form.Control
                  type="date"
                  value={formData.hireDate}
                  onChange={(e) => setFormData({ ...formData, hireDate: e.target.value })}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Salario *</Form.Label>
                <Form.Control
                  type="number"
                  value={formData.salary}
                  onChange={(e) => setFormData({ ...formData, salary: parseFloat(e.target.value) })}
                  required
                  min="0"
                  step="0.01"
                />
              </Form.Group>
            </Col>
          </Row>

          {!employee && (
            <>
              <hr />
              <h6 className="mb-3">
                <i className="bi bi-key me-2"></i>
                Credenciales de Acceso al Sistema
              </h6>
              <Row>
                <Col md={12}>
                  <Form.Group className="mb-3">
                    <Form.Label>Nombre de Usuario *</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.username}
                      onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                      required={!employee}
                      placeholder="Ej: bibliotecario1"
                    />
                    <Form.Text className="text-muted">
                      Este usuario se utilizará para iniciar sesión en el sistema
                    </Form.Text>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Contraseña *</Form.Label>
                    <Form.Control
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required={!employee}
                      minLength={6}
                      placeholder="Mínimo 6 caracteres"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Confirmar Contraseña *</Form.Label>
                    <Form.Control
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      required={!employee}
                      minLength={6}
                      placeholder="Repita la contraseña"
                    />
                  </Form.Group>
                </Col>
              </Row>
            </>
          )}

          <div className="d-flex justify-content-end gap-2 mt-3">
            <Button variant="secondary" onClick={onHide} disabled={loading}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Guardando...
                </>
              ) : (
                employee ? 'Actualizar' : 'Guardar'
              )}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EmployeeModal;
