import { Modal, Form, Button, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import { useData } from '../../shared/context/DataContext';
import { Supplier } from '../../shared/types';

interface SupplierModalProps {
  show: boolean;
  onHide: () => void;
  supplier?: Supplier | null;
}

const SupplierModal = ({ show, onHide, supplier }: SupplierModalProps) => {
  const { addSupplier, updateSupplier } = useData();
  const [formData, setFormData] = useState({
    name: supplier?.name || '',
    contactPerson: supplier?.contactPerson || '',
    email: supplier?.email || '',
    phone: supplier?.phone || '',
    address: supplier?.address || '',
    website: supplier?.website || '',
    taxId: supplier?.taxId || '',
    rating: supplier?.rating || 5,
    active: supplier?.active ?? true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newSupplier = new Supplier(
      supplier?.id || Date.now().toString(),
      formData.name,
      formData.contactPerson,
      formData.email,
      formData.phone,
      formData.address,
      formData.taxId,
      formData.active,
      formData.rating
    );

    if (formData.website) {
      newSupplier.website = formData.website;
    }

    if (supplier) {
      await updateSupplier(newSupplier);
    } else {
      await addSupplier(newSupplier);
    }
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          <i className="bi bi-truck me-2"></i>
          {supplier ? 'Editar Proveedor' : 'Registrar Nuevo Proveedor'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Nombre de la Empresa *</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Persona de Contacto *</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.contactPerson}
                  onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
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

          <Form.Group className="mb-3">
            <Form.Label>Dirección *</Form.Label>
            <Form.Control
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              required
            />
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>RUC / Tax ID *</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.taxId}
                  onChange={(e) => setFormData({ ...formData, taxId: e.target.value })}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Sitio Web</Form.Label>
                <Form.Control
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  placeholder="https://ejemplo.com"
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Calificación (1-5)</Form.Label>
            <Form.Range
              value={formData.rating}
              onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
              min="1"
              max="5"
            />
            <div className="text-center">
              <span className="text-warning">
                {'⭐'.repeat(formData.rating)}
              </span>
            </div>
          </Form.Group>

          <Form.Group className="mb-3 d-flex align-items-center gap-2">
            <Form.Check
              type="switch"
              id="supplier-active"
              label="Proveedor activo"
              checked={formData.active}
              onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
            />
          </Form.Group>

          <div className="d-flex justify-content-end gap-2">
            <Button variant="secondary" onClick={onHide}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              {supplier ? 'Actualizar' : 'Guardar'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default SupplierModal;
