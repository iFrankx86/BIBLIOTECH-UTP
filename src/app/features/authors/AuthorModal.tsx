import { Modal, Form, Button, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import { useData } from '../../shared/context/DataContext';
import { Author } from '../../shared/types';

interface AuthorModalProps {
  show: boolean;
  onHide: () => void;
  author?: Author | null;
  readOnly?: boolean;
}

const AuthorModal = ({ show, onHide, author, readOnly = false }: AuthorModalProps) => {
  const { addAuthor, updateAuthor } = useData();
  
  const [formData, setFormData] = useState({
    firstName: author?.firstName || '',
    lastName: author?.lastName || '',
    birthDate: author?.birthDate ? new Date(author.birthDate).toISOString().split('T')[0] : '',
    nationality: author?.nationality || '',
    biography: author?.biography || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (readOnly) {
      onHide();
      return;
    }
    
    const newAuthor = new Author(
      author?.id || Date.now().toString(),
      formData.firstName,
      formData.lastName,
      new Date(formData.birthDate),
      formData.nationality,
      formData.biography
    );

    if (author) {
      await updateAuthor(newAuthor);
    } else {
      await addAuthor(newAuthor);
    }
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          <i className="bi bi-person-lines-fill me-2"></i>
          {author ? 'Editar Autor' : 'Registrar Nuevo Autor'}
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
                <Form.Label>Fecha de Nacimiento *</Form.Label>
                <Form.Control
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                  required
                  disabled={readOnly}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Nacionalidad *</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.nationality}
                  onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                  required
                  disabled={readOnly}
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Biografía</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              value={formData.biography}
              onChange={(e) => setFormData({ ...formData, biography: e.target.value })}
              disabled={readOnly}
            />
          </Form.Group>

          <div className="d-flex justify-content-end gap-2">
            <Button variant="secondary" onClick={onHide}>
              {readOnly ? 'Cerrar' : 'Cancelar'}
            </Button>
            {!readOnly && (
              <Button variant="primary" type="submit">
                {author ? 'Actualizar' : 'Guardar'}
              </Button>
            )}
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AuthorModal;
