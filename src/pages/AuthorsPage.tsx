import { useState } from 'react';
import { Card, Table, Button, Badge } from 'react-bootstrap';
import { useData } from '../context/DataContext';
import { usePermissions } from '../hooks/usePermissions';
import { Author } from '../models';
import AuthorModal from '../components/modals/AuthorModal';

const AuthorsPage = () => {
  const { authors } = useData();
  const { hasPermission } = usePermissions();
  const [showModal, setShowModal] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState<Author | null>(null);

  const handleEdit = (author: Author) => {
    setSelectedAuthor(author);
    setShowModal(true);
  };

  const handleAdd = () => {
    setSelectedAuthor(null);
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
                    {hasPermission('canManageAuthors') && (
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => handleEdit(author)}
                      >
                        <i className="bi bi-pencil"></i>
                      </Button>
                    )}
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
        />
      )}
    </>
  );
};

export default AuthorsPage;
