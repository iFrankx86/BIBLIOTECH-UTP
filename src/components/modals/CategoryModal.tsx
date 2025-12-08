import { Modal, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Category } from '../../models';

interface CategoryModalProps {
  show: boolean;
  onHide: () => void;
  category?: Category | null;
}

const CategoryModal = ({ show, onHide, category }: CategoryModalProps) => {
  const { addCategory, updateCategory } = useData();
  
  const [formData, setFormData] = useState({
    name: category?.name || '',
    description: category?.description || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newCategory = new Category(
      category?.id || Date.now().toString(),
      formData.name,
      formData.description
    );

    if (category) {
      await updateCategory(newCategory);
    } else {
      await addCategory(newCategory);
    }
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>
          <i className="bi bi-tag-fill me-2"></i>
          {category ? 'Editar Categoría' : 'Registrar Nueva Categoría'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nombre *</Form.Label>
            <Form.Control
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </Form.Group>

          <div className="d-flex justify-content-end gap-2">
            <Button variant="secondary" onClick={onHide}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              {category ? 'Actualizar' : 'Guardar'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CategoryModal;
