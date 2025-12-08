import { Modal, Form, Button, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Employee } from '../../models';

interface EmployeeModalProps {
  show: boolean;
  onHide: () => void;
  employee?: Employee | null;
}

const EmployeeModal = ({ show, onHide, employee }: EmployeeModalProps) => {
  const { addEmployee, updateEmployee } = useData();
  
  const [formData, setFormData] = useState({
    firstName: employee?.firstName || '',
    lastName: employee?.lastName || '',
    email: employee?.email || '',
    phone: employee?.phone || '',
    position: employee?.position || '',
    department: employee?.department || 'circulation' as 'administration' | 'circulation' | 'cataloging' | 'reference' | 'maintenance',
    hireDate: employee?.hireDate ? new Date(employee.hireDate).toISOString().split('T')[0] : '',
    salary: employee?.salary || 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newEmployee = new Employee(
      employee?.id || Date.now().toString(),
      formData.firstName,
      formData.lastName,
      formData.email,
      formData.phone,
      formData.position,
      formData.department,
      new Date(formData.hireDate),
      formData.salary
    );

    if (employee) {
      await updateEmployee(newEmployee);
    } else {
      await addEmployee(newEmployee);
    }
    onHide();
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
                <Form.Label>Email *</Form.Label>
                <Form.Control
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
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

          <div className="d-flex justify-content-end gap-2">
            <Button variant="secondary" onClick={onHide}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              {employee ? 'Actualizar' : 'Guardar'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EmployeeModal;
