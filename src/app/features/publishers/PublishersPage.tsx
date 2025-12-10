import { useState } from 'react';
import { Card, Table, Button, Badge } from 'react-bootstrap';
import { useData } from '../../shared/context/DataContext';
import { usePermissions } from '../../shared/hooks/usePermissions';
import { Publisher } from '../../shared/types';
import PublisherModal from './PublisherModal';

const PublishersPage = () => {
  const { publishers, updatePublisher, deletePublisher } = useData();
  const { hasPermission } = usePermissions();
  const [showModal, setShowModal] = useState(false);
  const [selectedPublisher, setSelectedPublisher] = useState<Publisher | null>(null);

  const handleEdit = (publisher: Publisher) => {
    setSelectedPublisher(publisher);
    setShowModal(true);
  };

  const handleAdd = () => {
    setSelectedPublisher(null);
    setShowModal(true);
  };

  const handleToggleActive = async (publisher: Publisher) => {
    const nextActive = !(publisher.active ?? true);
    const updated = new Publisher(
      publisher.id,
      publisher.name,
      publisher.country,
      publisher.website,
      publisher.email,
      publisher.phone,
      publisher.address,
      publisher.foundedYear,
      nextActive
    );
    await updatePublisher(updated);
  };

  const handleDelete = async (publisher: Publisher) => {
    const confirmed = window.confirm(`¿Eliminar la editorial ${publisher.name}? Esta acción no se puede deshacer.`);
    if (!confirmed) return;
    await deletePublisher(publisher.id);
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>🏢 Gestión de Editoriales</h2>
          <p className="text-muted">Administra las editoriales registradas en la biblioteca</p>
        </div>
        {hasPermission('canManagePublishers') && (
          <Button variant="primary" onClick={handleAdd}>
            <i className="bi bi-plus-circle me-2"></i>
            Nueva Editorial
          </Button>
        )}
      </div>

      <Card>
        <Card.Body>
          <Table responsive hover>
            <thead className="table-light">
              <tr>
                <th>Nombre</th>
                <th>País</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>Sitio Web</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {publishers.map((publisher: Publisher) => (
                <tr key={publisher.id}>
                  <td><strong>{publisher.name}</strong></td>
                  <td>{publisher.country}</td>
                  <td>{publisher.email}</td>
                  <td>{publisher.phone}</td>
                  <td>
                    {publisher.website ? (
                      <a href={publisher.website} target="_blank" rel="noopener noreferrer">
                        <i className="bi bi-link-45deg"></i> Visitar
                      </a>
                    ) : (
                      <span className="text-muted">-</span>
                    )}
                  </td>
                  <td>
                    <Badge bg={publisher.active === false ? 'secondary' : 'success'}>
                      {publisher.active === false ? 'Inactiva' : 'Activa'}
                    </Badge>
                  </td>
                  <td className="d-flex gap-2">
                    {hasPermission('canManagePublishers') && (
                      <>
                        <Button
                          variant={publisher.active === false ? 'outline-secondary' : 'outline-success'}
                          size="sm"
                          title={publisher.active === false ? 'Activar editorial' : 'Desactivar editorial'}
                          onClick={() => handleToggleActive(publisher)}
                        >
                          <i className={publisher.active === false ? 'bi bi-toggle-off' : 'bi bi-toggle-on'}></i>
                        </Button>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => handleEdit(publisher)}
                        >
                          <i className="bi bi-pencil"></i>
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleDelete(publisher)}
                        >
                          <i className="bi bi-trash"></i>
                        </Button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {publishers.length === 0 && (
            <div className="text-center py-5 text-muted">
              <i className="bi bi-inbox" style={{ fontSize: '3rem' }}></i>
              <p className="mt-3">No hay editoriales registradas</p>
            </div>
          )}
        </Card.Body>
      </Card>

      {showModal && (
        <PublisherModal
          show={showModal}
          onHide={() => setShowModal(false)}
          publisher={selectedPublisher}
        />
      )}
    </>
  );
};

export default PublishersPage;
