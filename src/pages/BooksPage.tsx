import { useState, useMemo } from 'react';
import { Card, Table, Button, Badge, ButtonGroup, Alert } from 'react-bootstrap';
import { useData } from '../context/DataContext';
import { usePermissions } from '../hooks/usePermissions';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Book, Author, Publisher, Category, Reservation, Member } from '../models';
import BookModal from '../components/modals/BookModal';

const BooksPage = () => {
  const { books, authors, publishers, categories, members, deleteBook, addReservation } = useData();
  const { hasPermission, role } = usePermissions();
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [modalMode, setModalMode] = useState<'view' | 'edit' | 'create'>('create');
  const [selection, setSelection] = useState<Record<string, number>>({});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');

  const searchParams = new URLSearchParams(location.search);
  const stateReserve = (location.state as { reserveMode?: boolean } | null)?.reserveMode;
  const reserveFlag = (stateReserve ?? false) || searchParams.get('reserve') === '1';
  const reserveMode = reserveFlag;

  const [selectedMemberId, setSelectedMemberId] = useState<string>('');

  const totalSelected = useMemo(
    () => Object.values(selection).reduce((sum, count) => sum + count, 0),
    [selection]
  );

  const selectedBooks = useMemo(
    () => books.filter((b: Book) => selection[b.id] > 0),
    [books, selection]
  );

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

  const adjustSelection = (book: Book, delta: number) => {
    setError('');
    setInfo('');
    setSelection((prev) => {
      const current = prev[book.id] || 0;
      const next = Math.min(Math.max(current + delta, 0), book.availableCopies);
      if (next === 0) {
        const { [book.id]: _omit, ...rest } = prev;
        return rest;
      }
      return { ...prev, [book.id]: next };
    });
  };

  const handleBulkReserve = async () => {
    if (!user) {
      setError('Debes iniciar sesión para reservar.');
      return;
    }
    const targetMemberId = role === 'member' ? user.id : selectedMemberId;
    if (!targetMemberId) {
      setError('Selecciona el miembro para quien crearás la reserva.');
      return;
    }
    if (totalSelected === 0) {
      setError('Selecciona al menos un libro.');
      return;
    }
    setSaving(true);
    setError('');
    setInfo('');

    const groupCode = `RES-${Date.now()}`;
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 7);

    try {
      for (const book of selectedBooks) {
        const count = selection[book.id] || 0;
        if (book.availableCopies <= 0) {
          throw new Error(`El libro "${book.title}" ya no tiene copias disponibles.`);
        }
        const units = Math.min(count, book.availableCopies);
        for (let i = 0; i < units; i++) {
          const res = new Reservation(
            `${Date.now()}-${book.id}-${i}`,
            book.id,
            targetMemberId,
            new Date(),
            new Date(expirationDate),
            'pending',
            groupCode
          );
          await addReservation(res);
        }
      }
      setSelection({});
      setInfo('Reserva creada. Puedes verla en Mis Reservas.');
      navigate('/reservations');
    } catch (err) {
      setError('No se pudo procesar la reserva. Verifica disponibilidad.');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <div>
          <h2>📚 {role === 'member' ? 'Catálogo de Libros' : 'Gestión de Libros'}</h2>
          <p className="text-muted">
            {role === 'member' 
              ? 'Explora el catálogo de libros disponibles en la biblioteca' 
              : 'Administra el catálogo de libros de la biblioteca'}
          </p>
        </div>
        <div className="d-flex gap-2">
          {role === 'member' && !reserveMode && (
            <Button
              variant="outline-primary"
              onClick={() => navigate('/books?reserve=1', { state: { reserveMode: true } })}
            >
              <i className="bi bi-bookmark-plus me-2"></i>
              Hacer Reserva
            </Button>
          )}
          {role !== 'member' && (
            <Button
              variant="outline-secondary"
              onClick={() => navigate('/reservations')}
            >
              <i className="bi bi-bookmarks me-2"></i>
              Gestión de Reservas
            </Button>
          )}
          {hasPermission('canManageBooks') && !reserveMode && (
            <Button variant="primary" onClick={() => { setSelectedBook(null); setModalMode('create'); setShowModal(true); }}>
              <i className="bi bi-plus-circle me-2"></i>
              Nuevo Libro
            </Button>
          )}
        </div>
      </div>

      <Card>
        <Card.Body>
          {reserveMode && (
            <Alert variant="info" className="mb-3">
              {role === 'member'
                ? 'Modo reservar: selecciona uno o varios libros y pulsa "Realizar mi Reserva". Se generará un solo código para este lote.'
                : 'Modo reservar (staff): selecciona el miembro y los libros para crear la reserva en lote.'}
            </Alert>
          )}
          {reserveMode && role !== 'member' && (
            <div className="mb-3 d-flex flex-column flex-md-row gap-2 align-items-start align-items-md-center">
              <strong className="text-muted">Reservar para:</strong>
              <select
                className="form-select w-100 w-md-auto"
                value={selectedMemberId}
                onChange={(e) => setSelectedMemberId(e.target.value)}
              >
                <option value="">Selecciona un miembro</option>
                {members.map((m: Member) => (
                  <option key={m.id} value={m.id}>
                    {m.fullName} - {m.email}
                  </option>
                ))}
              </select>
            </div>
          )}
          {error && <Alert variant="danger" className="mb-3" onClose={() => setError('')} dismissible>{error}</Alert>}
          {info && <Alert variant="success" className="mb-3" onClose={() => setInfo('')} dismissible>{info}</Alert>}
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
                {reserveMode && <th>Seleccionar</th>}
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
                  {reserveMode && (
                    <td>
                      <ButtonGroup size="sm">
                        <Button
                          variant="outline-secondary"
                          onClick={() => adjustSelection(book, -1)}
                          disabled={!selection[book.id]}
                        >
                          -
                        </Button>
                        <Button variant="light" disabled>{selection[book.id] || 0}</Button>
                        <Button
                          variant="outline-secondary"
                          onClick={() => adjustSelection(book, 1)}
                          disabled={book.availableCopies === 0 || (selection[book.id] || 0) >= book.availableCopies}
                        >
                          +
                        </Button>
                      </ButtonGroup>
                    </td>
                  )}
                  <td>
                    <ButtonGroup size="sm">
                      <Button
                        variant="outline-info"
                        title="Ver detalles"
                        onClick={() => { setSelectedBook(book); setModalMode('view'); setShowModal(true); }}
                      >
                        <i className="bi bi-eye"></i>
                      </Button>
                      {hasPermission('canManageBooks') && !reserveMode && (
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

          {reserveMode && (
            <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-3 mt-3">
              <div>
                <strong>{totalSelected}</strong> libro(s) seleccionado(s).
                {selectedBooks.length > 0 && (
                  <div className="text-muted small mt-1">
                    {selectedBooks.map((b) => `${b.title} (x${selection[b.id] || 0})`).join(' • ')}
                  </div>
                )}
              </div>
              <div className="d-flex gap-2">
                <Button
                  variant="success"
                  disabled={saving || totalSelected === 0}
                  onClick={handleBulkReserve}
                >
                  {saving ? 'Procesando...' : 'Realizar mi Reserva'}
                </Button>
                <Button
                  variant="outline-secondary"
                  disabled={saving || totalSelected === 0}
                  onClick={() => setSelection({})}
                >
                  Limpiar selección
                </Button>
              </div>
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
