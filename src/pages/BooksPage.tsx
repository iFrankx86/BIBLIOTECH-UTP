import { useState } from 'react';
import { Card, Table, Button, Badge, ButtonGroup } from 'react-bootstrap';
import { useData } from '../context/DataContext';
import { usePermissions } from '../hooks/usePermissions';
import { Book, Author, Publisher, Category } from '../models';
import BookModal from '../components/modals/BookModal';

const BooksPage = () => {
  const { books, authors, publishers, categories, deleteBook } = useData();
  const { hasPermission, role } = usePermissions();
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [modalMode, setModalMode] = useState<'view' | 'edit' | 'create'>('create');

  const getAuthorName = (authorId: string) => {
    const author = authors.find((a: Author) => a.id === authorId);
    return author ? author.fullName : 'Desconocido';
  };

  const getPublisherName = (publisherId: string) => {
    const publisher = publishers.find((p: Publisher) => p.id === publisherId);
    return publisher ? publisher.name : 'Desconocida';
  };

  const getCategoryName = (categoryId: string) => {
    const category = categories.find((c: Category) => c.id === categoryId);
    return category ? category.name : 'Sin categoría';
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>📚 {role === 'member' ? 'Catálogo de Libros' : 'Gestión de Libros'}</h2>
          <p className="text-muted">
            {role === 'member' 
              ? 'Explora el catálogo de libros disponibles en la biblioteca' 
              : 'Administra el catálogo de libros de la biblioteca'}
          </p>
        </div>
        {hasPermission('canManageBooks') && (
          <Button variant="primary" onClick={() => { setSelectedBook(null); setModalMode('create'); setShowModal(true); }}>
            <i className="bi bi-plus-circle me-2"></i>
            Nuevo Libro
          </Button>
        )}
      </div>

      <Card>
        <Card.Body>
          <Table responsive hover>
            <thead className="table-light">
              <tr>
                <th>Título</th>
                <th>ISBN</th>
                <th>Autor</th>
                <th>Editorial</th>
                <th>Categoría</th>
                <th>Año</th>
                <th>Copias</th>
                <th>Disponibles</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book: Book) => (
                <tr key={book.id}>
                  <td><strong>{book.title}</strong></td>
                  <td><code>{book.isbn}</code></td>
                  <td>{getAuthorName(book.authorId)}</td>
                  <td>{getPublisherName(book.publisherId)}</td>
                  <td>
                    <Badge bg="info">{getCategoryName(book.categoryId)}</Badge>
                  </td>
                  <td>{book.publicationYear}</td>
                  <td>{book.totalCopies}</td>
                  <td>
                    <Badge bg={book.availableCopies > 0 ? 'success' : 'danger'}>
                      {book.availableCopies}
                    </Badge>
                  </td>
                  <td>
                    <ButtonGroup size="sm">
                      <Button
                        variant="outline-info"
                        title="Ver detalles"
                        onClick={() => { setSelectedBook(book); setModalMode('view'); setShowModal(true); }}
                      >
                        <i className="bi bi-eye"></i>
                      </Button>
                      {hasPermission('canManageBooks') && (
                        <>
                          <Button
                            variant="outline-primary"
                            onClick={() => { setSelectedBook(book); setModalMode('edit'); setShowModal(true); }}
                          >
                            <i className="bi bi-pencil"></i>
                          </Button>
                          <Button
                            variant="outline-danger"
                            onClick={() => {
                              if (window.confirm('¿Eliminar este libro? Esta acción no se puede deshacer.')) {
                                deleteBook(book.id);
                              }
                            }}
                          >
                            <i className="bi bi-trash"></i>
                          </Button>
                        </>
                      )}
                    </ButtonGroup>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {books.length === 0 && (
            <div className="text-center py-5 text-muted">
              <i className="bi bi-inbox" style={{ fontSize: '3rem' }}></i>
              <p className="mt-3">No hay libros registrados</p>
            </div>
          )}
        </Card.Body>
      </Card>

      <BookModal 
        show={showModal} 
        onHide={() => setShowModal(false)} 
        book={selectedBook}
        readOnly={modalMode === 'view'}
      />
    </>
  );
};

export default BooksPage;
