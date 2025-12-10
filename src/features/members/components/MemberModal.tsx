import { Modal, Form, Button, Row, Col } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useData } from '../../../shared/context/DataContext';
import { Member } from '../../../shared/types';

interface MemberModalProps {
  show: boolean;
  onHide: () => void;
  member?: Member;
  readOnly?: boolean;
}

const MemberModal = ({ show, onHide, member, readOnly = false }: MemberModalProps) => {
  const { addMember, updateMember } = useData();
  
  const [formData, setFormData] = useState({
    firstName: member?.firstName || '',
    lastName: member?.lastName || '',
    email: member?.email || '',
    phone: member?.phone || '',
    address: member?.address || '',
    membershipType: (member?.membershipType || 'basic') as 'basic' | 'premium' | 'vip',
    idNumber: member?.idNumber || '',
    active: member?.active ?? true,
  });

  useEffect(() => {
    setFormData({
      firstName: member?.firstName || '',
      lastName: member?.lastName || '',
      email: member?.email || '',
      phone: member?.phone || '',
      address: member?.address || '',
      membershipType: (member?.membershipType || 'basic') as 'basic' | 'premium' | 'vip',
      idNumber: member?.idNumber || '',
      active: member?.active ?? true,
    });
  }, [member, show]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (readOnly) {
      onHide();
      return;
    }
    
    if (member) {
      // Update existing member
      const updatedMember = new Member(
        member.id,
        formData.firstName,
        formData.lastName,
        formData.email,
        formData.phone,
        formData.address,
        formData.membershipType,
        formData.idNumber,
        formData.active
      );
      updatedMember.membershipDate = member.membershipDate;
      updateMember(updatedMember);
    } else {
      // Create new member
      const newMember = new Member(
        Date.now().toString(),
        formData.firstName,
        formData.lastName,
        formData.email,
        formData.phone,
        formData.address,
        formData.membershipType,
        formData.idNumber,
        formData.active
      );
      addMember(newMember);
    }
    
    onHide();
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      membershipType: 'basic',
      idNumber: '',
      active: true,
    });
  };

  const modalTitle = member ? (readOnly ? 'Detalle de Miembro' : 'Editar Miembro') : 'Agregar Nuevo Miembro';

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          <i className="bi bi-person-plus me-2"></i>
          {modalTitle}
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
                  disabled={readOnly}
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
                  disabled={readOnly}
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
                  disabled={readOnly}
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
                  disabled={readOnly}
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
                  disabled={readOnly}
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
                  disabled={readOnly}
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
              disabled={readOnly}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Check
              type="switch"
              id="member-active"
              label={formData.active ? 'Miembro Activo' : 'Miembro Inactivo'}
              checked={formData.active}
              onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
              disabled={readOnly}
            />
          </Form.Group>

          <div className="d-flex justify-content-end gap-2">
            <Button variant="secondary" onClick={onHide}>
              {readOnly ? 'Cerrar' : 'Cancelar'}
            </Button>
            {!readOnly && (
              <Button variant="primary" type="submit">
                {member ? 'Actualizar' : 'Guardar'} Miembro
              </Button>
            )}
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default MemberModal;
