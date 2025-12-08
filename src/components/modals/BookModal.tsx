import { Modal, Form, Button, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Book } from '../../models';

interface BookModalProps {
  show: boolean;
  onHide: () => void;
  book?: Book | null;
}

const BookModal = ({ show, onHide, book }: BookModalProps) => {
  const { addBook, updateBook, authors, publishers, categories } = useData();
  
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
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
      updateBook(newBook);
    } else {
      addBook(newBook);
    }

    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          <i className="bi bi-book me-2"></i>
          {book ? 'Editar Libro' : 'Registrar Nuevo Libro'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
                >
                  <option value="">Seleccionar autor</option>
                  {authors.map((author) => (
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
                >
                  <option value="">Seleccionar editorial</option>
                  {publishers.map((publisher) => (
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
                >
                  <option value="">Seleccionar categoría</option>
                  {categories.map((category) => (
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
            />
          </Form.Group>

          <div className="d-flex justify-content-end gap-2">
            <Button variant="secondary" onClick={onHide}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              {book ? 'Actualizar' : 'Guardar'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default BookModal;
