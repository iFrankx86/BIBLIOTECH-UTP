import { useState } from 'react';
import { Card, Table, Button, Badge, ButtonGroup } from 'react-bootstrap';
import { useData } from '../../../shared/context/DataContext';
import { usePermissions } from '../../../shared/hooks/usePermissions';
import { Author } from '../../../shared/types';
import AuthorModal from '../components/AuthorModal';

const AuthorsPage = () => {
  const { authors, deleteAuthor } = useData();
  const { hasPermission } = usePermissions();
  const [showModal, setShowModal] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState<Author | null>(null);
  const [modalMode, setModalMode] = useState<'view' | 'edit' | 'create'>('create');

  const handleEdit = (author: Author) => {
    setSelectedAuthor(author);
    setModalMode('edit');
    setShowModal(true);
  };

  const handleAdd = () => {
    setSelectedAuthor(null);
    setModalMode('create');
    setShowModal(true);
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>✍️ Gestión de Autores</h2>
          <p className="text-muted">Administra los autores registrados en la biblioteca</p>
        </div>
        {hasPermission('canManageAuthors') && (
          <Button variant="primary" onClick={handleAdd}>
            <i className="bi bi-plus-circle me-2"></i>
            Nuevo Autor
          </Button>
        )}
      </div>

      <Card>
        <Card.Body>
          <Table responsive hover>
            <thead className="table-light">
              <tr>
                <th>Nombre Completo</th>
                <th>Nacionalidad</th>
                <th>Fecha de Nacimiento</th>
                <th>Biografía</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {authors.map((author: Author) => (
                <tr key={author.id}>
                  <td><strong>{author.fullName}</strong></td>
                  <td>{author.nationality}</td>
                  <td>{new Date(author.birthDate).toLocaleDateString()}</td>
                  <td>
                    <small className="text-muted">
                      {author.biography?.substring(0, 50)}...
                    </small>
                  </td>
                  <td>
                    <Badge bg="success">Activo</Badge>
                  </td>
                  <td>
                    <ButtonGroup size="sm">
                      <Button
                        variant="outline-info"
                        onClick={() => { setSelectedAuthor(author); setModalMode('view'); setShowModal(true); }}
                      >
                        <i className="bi bi-eye"></i>
                      </Button>
                      {hasPermission('canManageAuthors') && (
                        <>
                          <Button
                            variant="outline-primary"
                            onClick={() => handleEdit(author)}
                          >
                            <i className="bi bi-pencil"></i>
                          </Button>
                          <Button
                            variant="outline-danger"
                            onClick={() => {
                              if (window.confirm('¿Eliminar este autor?')) {
                                deleteAuthor(author.id);
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
          {authors.length === 0 && (
            <div className="text-center py-5 text-muted">
              <i className="bi bi-inbox" style={{ fontSize: '3rem' }}></i>
              <p className="mt-3">No hay autores registrados</p>
            </div>
          )}
        </Card.Body>
      </Card>

      {showModal && (
        <AuthorModal
          show={showModal}
          onHide={() => setShowModal(false)}
          author={selectedAuthor}
          readOnly={modalMode === 'view'}
        />
      )}
    </>
  );
};

export default AuthorsPage;
