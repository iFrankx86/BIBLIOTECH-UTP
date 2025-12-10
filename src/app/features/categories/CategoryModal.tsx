import { Modal, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useData } from '../../shared/context/DataContext';
import { Category } from '../../shared/types';

interface CategoryModalProps {
  show: boolean;
  onHide: () => void;
  category?: Category | null;
  readOnly?: boolean;
}

const CategoryModal = ({ show, onHide, category, readOnly = false }: CategoryModalProps) => {
  const { addCategory, updateCategory } = useData();
  
  const [formData, setFormData] = useState({
    name: category?.name || '',
    description: category?.description || '',
    active: category?.active ?? true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newCategory = new Category(
      category?.id || Date.now().toString(),
      formData.name,
      formData.description,
      category?.parentCategoryId,
      formData.active
    );

    if (readOnly) {
      onHide();
      return;
    }

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
              disabled={readOnly}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              disabled={readOnly}
            />
          </Form.Group>

          <Form.Group className="mb-3 d-flex align-items-center gap-2">
            <Form.Check
              type="switch"
              id="category-active"
              label="Categoría activa"
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
                {category ? 'Actualizar' : 'Guardar'}
              </Button>
            )}
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CategoryModal;
