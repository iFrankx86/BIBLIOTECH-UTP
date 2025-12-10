import { useState } from 'react';
import { Card, Row, Col, Button, Badge, ButtonGroup } from 'react-bootstrap';
import { Category } from '../../shared/types';
import { useData } from '../../shared/context/DataContext';
import { usePermissions } from '../../shared/hooks/usePermissions';
import CategoryModal from './CategoryModal';

const CategoriesPage = () => {
  const { categories, updateCategory, deleteCategory } = useData();
  const { hasPermission } = usePermissions();
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [modalMode, setModalMode] = useState<'view' | 'edit' | 'create'>('create');

  const handleEdit = (category: Category) => {
    setSelectedCategory(category);
    setModalMode('edit');
    setShowModal(true);
  };

  const handleAdd = () => {
    setSelectedCategory(null);
    setModalMode('create');
    setShowModal(true);
  };

  const toggleActive = async (category: Category) => {
    const updated = new Category(
      category.id,
      category.name,
      category.description,
      category.parentCategoryId,
      !category.active
    );
    await updateCategory(updated);
  };

  const handleDelete = async (category: Category) => {
    const confirmed = window.confirm(`¿Eliminar la categoría ${category.name}? Esta acción no se puede deshacer.`);
    if (!confirmed) return;
    await deleteCategory(category.id);
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>🏷️ Categorías de Libros</h2>
          <p className="text-muted">Explora y gestiona las categorías disponibles</p>
        </div>
        {hasPermission('canManageCategories') && (
          <Button variant="primary" onClick={handleAdd}>
            <i className="bi bi-plus-circle me-2"></i>
            Nueva Categoría
          </Button>
        )}
      </div>

      <Row>
        {categories.map((category: Category) => (
          <Col md={6} lg={4} key={category.id} className="mb-4">
            <Card className="h-100">
              <Card.Body>
                <Card.Title className="d-flex align-items-center justify-content-between">
                  <span>
                    <i className="bi bi-tag-fill text-primary me-2"></i>
                    {category.name}
                  </span>
                  <ButtonGroup size="sm">
                    <Button
                      variant={category.active ? 'outline-success' : 'outline-secondary'}
                      title={category.active ? 'Marcar como inactiva' : 'Marcar como activa'}
                      onClick={() => toggleActive(category)}
                      disabled={!hasPermission('canManageCategories')}
                    >
                      <i className={category.active ? 'bi bi-toggle-on' : 'bi bi-toggle-off'}></i>
                    </Button>
                    {hasPermission('canManageCategories') && (
                      <Button
                        variant="outline-primary"
                        onClick={() => handleEdit(category)}
                      >
                        <i className="bi bi-pencil"></i>
                      </Button>
                    )}
                    {hasPermission('canManageCategories') && (
                      <Button
                        variant="outline-danger"
                        onClick={() => handleDelete(category)}
                      >
                        <i className="bi bi-trash"></i>
                      </Button>
                    )}
                  </ButtonGroup>
                </Card.Title>
                <Card.Text className="text-muted">
                  {category.description}
                </Card.Text>
                <Badge bg={category.active ? 'success' : 'secondary'}>
                  {category.active ? 'Activa' : 'Inactiva'}
                </Badge>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {categories.length === 0 && (
        <Card>
          <Card.Body className="text-center py-5 text-muted">
            <i className="bi bi-inbox" style={{ fontSize: '3rem' }}></i>
            <p className="mt-3">No hay categorías registradas</p>
          </Card.Body>
        </Card>
      )}

      {showModal && (
        <CategoryModal
          show={showModal}
          onHide={() => setShowModal(false)}
          category={selectedCategory}
          readOnly={modalMode === 'view'}
        />
      )}
    </>
  );
};

export default CategoriesPage;
