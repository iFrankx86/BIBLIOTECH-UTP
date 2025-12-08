import { Modal, Form, Button, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Publisher } from '../../models';

interface PublisherModalProps {
  show: boolean;
  onHide: () => void;
  publisher?: Publisher | null;
}

const PublisherModal = ({ show, onHide, publisher }: PublisherModalProps) => {
  const { addPublisher, updatePublisher } = useData();
  
  const [formData, setFormData] = useState({
    name: publisher?.name || '',
    country: publisher?.country || '',
    email: publisher?.email || '',
    phone: publisher?.phone || '',
    website: publisher?.website || '',
    address: publisher?.address || '',
    foundedYear: publisher?.foundedYear || new Date().getFullYear(),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newPublisher = new Publisher(
      publisher?.id || Date.now().toString(),
      formData.name,
      formData.country,
      formData.website,
      formData.email,
      formData.phone,
      formData.address,
      formData.foundedYear
    );

    if (publisher) {
      await updatePublisher(newPublisher);
    } else {
      await addPublisher(newPublisher);
    }
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          <i className="bi bi-building me-2"></i>
          {publisher ? 'Editar Editorial' : 'Registrar Nueva Editorial'}
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
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>País *</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
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
                <Form.Label>Sitio Web</Form.Label>
                <Form.Control
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  placeholder="https://ejemplo.com"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Año de Fundación *</Form.Label>
                <Form.Control
                  type="number"
                  value={formData.foundedYear}
                  onChange={(e) => setFormData({ ...formData, foundedYear: parseInt(e.target.value) })}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Dirección</Form.Label>
            <Form.Control
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
          </Form.Group>

          <div className="d-flex justify-content-end gap-2">
            <Button variant="secondary" onClick={onHide}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              {publisher ? 'Actualizar' : 'Guardar'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default PublisherModal;
