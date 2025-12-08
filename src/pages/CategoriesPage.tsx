import { Card, Row, Col } from 'react-bootstrap';
import { useData } from '../context/DataContext';

const CategoriesPage = () => {
  const { categories } = useData();

  return (
    <>
      <div className="mb-4">
        <h2>🏷️ Categorías de Libros</h2>
        <p className="text-muted">Explora las categorías disponibles</p>
      </div>

      <Row>
        {categories.map((category) => (
          <Col md={6} lg={4} key={category.id} className="mb-4">
            <Card className="h-100">
              <Card.Body>
                <Card.Title className="d-flex align-items-center">
                  <i className="bi bi-tag-fill text-primary me-2"></i>
                  {category.name}
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
    </>
  );
};

export default CategoriesPage;
