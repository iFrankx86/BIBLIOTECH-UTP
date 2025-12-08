import { useState } from 'react';
import { Card, Table, Button, Badge } from 'react-bootstrap';
import { useData } from '../context/DataContext';
import { Book } from '../models';
import BookModal from '../components/modals/BookModal';

const BooksPage = () => {
  const { books, authors, publishers, categories } = useData();
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const getAuthorName = (authorId: string) => {
    const author = authors.find(a => a.id === authorId);
    return author ? author.fullName : 'Desconocido';
  };

  const getPublisherName = (publisherId: string) => {
    const publisher = publishers.find(p => p.id === publisherId);
    return publisher ? publisher.name : 'Desconocida';
  };

  const getCategoryName = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : 'Sin categoría';
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>📚 Gestión de Libros</h2>
          <p className="text-muted">Administra el catálogo de libros de la biblioteca</p>
        </div>
        <Button variant="primary" onClick={() => { setSelectedBook(null); setShowModal(true); }}>
          <i className="bi bi-plus-circle me-2"></i>
          Nuevo Libro
        </Button>
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
              {books.map((book) => (
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
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="me-2"
                      onClick={() => { setSelectedBook(book); setShowModal(true); }}
                    >
                      <i className="bi bi-pencil"></i>
                    </Button>
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
      />
    </>
  );
};

export default BooksPage;
