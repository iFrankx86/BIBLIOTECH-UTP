import { Modal, Form, Button, Row, Col, Badge } from 'react-bootstrap';
import { useEffect, useMemo, useState } from 'react';
import { useData } from '../../context/DataContext';
import { Book, Author, Publisher, Category } from '../../models';

interface BookModalProps {
  show: boolean;
  onHide: () => void;
  book?: Book | null;
  readOnly?: boolean;
}

const BookModal = ({ show, onHide, book, readOnly = false }: BookModalProps) => {
  const { addBook, updateBook, authors, publishers, categories } = useData();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: book?.title || '',
    isbn: book?.isbn || '',
    authorId: book?.authorId || '',
    publisherId: book?.publisherId || '',
    categoryId: book?.categoryId || '',
    publicationYear: book?.publicationYear || new Date().getFullYear(),
    totalCopies: book?.totalCopies || 1,
    description: book?.description || '',
    language: book?.language || 'Español',
    pages: book?.pages || 0,
  });

  useEffect(() => {
    setFormData({
      title: book?.title || '',
      isbn: book?.isbn || '',
      authorId: book?.authorId || '',
      publisherId: book?.publisherId || '',
      categoryId: book?.categoryId || '',
      publicationYear: book?.publicationYear || new Date().getFullYear(),
      totalCopies: book?.totalCopies || 1,
      description: book?.description || '',
      language: book?.language || 'Español',
      pages: book?.pages || 0,
    });
  }, [book]);

  const modalTitle = useMemo(() => {
    if (readOnly) return 'Detalle de Libro';
    return book ? 'Editar Libro' : 'Registrar Nuevo Libro';
  }, [book, readOnly]);

  const authorName = useMemo(() => {
    if (!book) return '';
    const found = authors.find((a: Author) => a.id === book.authorId);
    return found?.fullName || 'Sin autor';
  }, [authors, book]);

  const publisherName = useMemo(() => {
    if (!book) return '';
    const found = publishers.find((p: Publisher) => p.id === book.publisherId);
    return found?.name || 'Sin editorial';
  }, [publishers, book]);

  const categoryName = useMemo(() => {
    if (!book) return '';
    const found = categories.find((c: Category) => c.id === book.categoryId);
    return found?.name || 'Sin categoría';
  }, [categories, book]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (readOnly) {
      onHide();
      return;
    }
    setLoading(true);
    
    try {
      const newBook = new Book(
        book?.id || Date.now().toString(),
        formData.title,
        formData.isbn,
        formData.authorId,
        formData.publisherId,
        formData.categoryId,
        formData.publicationYear,
        formData.totalCopies,
        formData.description,
        formData.language,
        formData.pages
      );

      if (book) {
        // Mantener las copias disponibles existentes
        newBook.availableCopies = book.availableCopies;
        await updateBook(newBook);
      } else {
        // Nuevos libros tienen todas las copias disponibles
        newBook.availableCopies = formData.totalCopies;
        await addBook(newBook);
      }

      onHide();
    } catch (error) {
      console.error('Error al guardar el libro:', error);
      alert('Error al guardar el libro. Por favor, intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          <i className="bi bi-book me-2"></i>
          {modalTitle}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {readOnly && book ? (
          <div className="mb-3">
            <Row className="mb-3">
              <Col md={8}>
                <h4 className="mb-1">{book.title}</h4>
                <div className="text-muted">ISBN: <code>{book.isbn}</code></div>
              </Col>
              <Col md={4} className="text-md-end mt-2 mt-md-0">
                <Badge bg={book.availableCopies > 0 ? 'success' : 'danger'} className="me-2">{book.availableCopies} disponibles</Badge>
                <Badge bg="secondary">{book.totalCopies} copias totales</Badge>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={4} className="mb-3">
                <small className="text-muted d-block">Autor</small>
                <strong>{authorName}</strong>
              </Col>
              <Col md={4} className="mb-3">
                <small className="text-muted d-block">Editorial</small>
                <strong>{publisherName}</strong>
              </Col>
              <Col md={4} className="mb-3">
                <small className="text-muted d-block">Categoría</small>
                <strong>{categoryName}</strong>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={4} className="mb-3">
                <small className="text-muted d-block">Año de publicación</small>
                <strong>{book.publicationYear}</strong>
              </Col>
              <Col md={4} className="mb-3">
                <small className="text-muted d-block">Idioma</small>
                <strong>{book.language}</strong>
              </Col>
              <Col md={4} className="mb-3">
                <small className="text-muted d-block">Páginas</small>
                <strong>{book.pages}</strong>
              </Col>
            </Row>

            <div className="mb-3">
              <small className="text-muted d-block">Descripción</small>
              <p className="mb-0">{book.description || 'Sin descripción registrada.'}</p>
            </div>
          </div>
        ) : (
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Título *</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  disabled={readOnly}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>ISBN *</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.isbn}
                  onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
                  required
                  disabled={readOnly}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Autor *</Form.Label>
                <Form.Select
                  value={formData.authorId}
                  onChange={(e) => setFormData({ ...formData, authorId: e.target.value })}
                  required
                  disabled={readOnly}
                >
                  <option value="">Seleccionar autor</option>
                  {authors.map((author: Author) => (
                    <option key={author.id} value={author.id}>
                      {author.fullName}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Editorial *</Form.Label>
                <Form.Select
                  value={formData.publisherId}
                  onChange={(e) => setFormData({ ...formData, publisherId: e.target.value })}
                  required
                  disabled={readOnly}
                >
                  <option value="">Seleccionar editorial</option>
                  {publishers.map((publisher: Publisher) => (
                    <option key={publisher.id} value={publisher.id}>
                      {publisher.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Categoría *</Form.Label>
                <Form.Select
                  value={formData.categoryId}
                  onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                  required
                  disabled={readOnly}
                >
                  <option value="">Seleccionar categoría</option>
                  {categories.map((category: Category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Año de Publicación *</Form.Label>
                <Form.Control
                  type="number"
                  value={formData.publicationYear}
                  onChange={(e) => setFormData({ ...formData, publicationYear: parseInt(e.target.value) })}
                  required
                  disabled={readOnly}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Total Copias *</Form.Label>
                <Form.Control
                  type="number"
                  value={formData.totalCopies}
                  onChange={(e) => setFormData({ ...formData, totalCopies: parseInt(e.target.value) })}
                  min="1"
                  required
                  disabled={readOnly}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Idioma *</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.language}
                  onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                  required
                  disabled={readOnly}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Páginas</Form.Label>
                <Form.Control
                  type="number"
                  value={formData.pages}
                  onChange={(e) => setFormData({ ...formData, pages: parseInt(e.target.value) })}
                  min="0"
                  disabled={readOnly}
                />
              </Form.Group>
            </Col>
          </Row>

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

          <div className="d-flex justify-content-end gap-2">
            <Button variant="secondary" onClick={onHide}>
              {readOnly ? 'Cerrar' : 'Cancelar'}
            </Button>
            {!readOnly && (
              <Button variant="primary" type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Guardando...
                  </>
                ) : (
                  book ? 'Actualizar' : 'Guardar'
                )}
              </Button>
            )}
          </div>
        </Form>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default BookModal;
