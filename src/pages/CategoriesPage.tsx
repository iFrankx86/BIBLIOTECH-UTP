import { useState } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { Category } from '../models';
import { useData } from '../context/DataContext';
import { usePermissions } from '../hooks/usePermissions';
import CategoryModal from '../components/modals/CategoryModal';

const CategoriesPage = () => {
  const { categories } = useData();
  const { hasPermission } = usePermissions();
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const handleEdit = (category: Category) => {
    setSelectedCategory(category);
    setShowModal(true);
  };

  const handleAdd = () => {
    setSelectedCategory(null);
    setShowModal(true);
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
                  {hasPermission('canManageCategories') && (
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => handleEdit(category)}
                    >
                      <i className="bi bi-pencil"></i>
                    </Button>
                  )}
                </Card.Title>
                <Card.Text className="text-muted">
                  {category.description}
                </Card.Text>
                {category.active ? (
                  <span className="badge bg-success">Activa</span>
                ) : (
                  <span className="badge bg-secondary">Inactiva</span>
                )}
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
        />
      )}
    </>
  );
};

export default CategoriesPage;
