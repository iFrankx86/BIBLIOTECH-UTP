import { Modal, Form, Button, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Member } from '../../models';

interface MemberModalProps {
  show: boolean;
  onHide: () => void;
}

const MemberModal = ({ show, onHide }: MemberModalProps) => {
  const { addMember } = useData();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    membershipType: 'basic' as 'basic' | 'premium' | 'vip',
    idNumber: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newMember = new Member(
      Date.now().toString(),
      formData.firstName,
      formData.lastName,
      formData.email,
      formData.phone,
      formData.address,
      formData.membershipType,
      formData.idNumber
    );

    addMember(newMember);
    onHide();
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      membershipType: 'basic',
      idNumber: '',
    });
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          <i className="bi bi-person-plus me-2"></i>
          Agregar Nuevo Miembro
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
                <Form.Label>Número de Identificación *</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.idNumber}
                  onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Tipo de Membresía *</Form.Label>
                <Form.Select
                  value={formData.membershipType}
                  onChange={(e) => setFormData({ ...formData, membershipType: e.target.value as 'basic' | 'premium' | 'vip' })}
                  required
                >
                  <option value="basic">Básica</option>
                  <option value="premium">Premium</option>
                  <option value="vip">VIP</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Dirección *</Form.Label>
            <Form.Control
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              required
            />
          </Form.Group>

          <div className="d-flex justify-content-end gap-2">
            <Button variant="secondary" onClick={onHide}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              Guardar Miembro
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default MemberModal;
