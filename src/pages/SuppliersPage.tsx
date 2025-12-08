import { useState } from 'react';
import { Card, Table, Button, Badge } from 'react-bootstrap';
import { useData } from '../context/DataContext';
import { usePermissions } from '../hooks/usePermissions';
import { Supplier } from '../models';
import SupplierModal from '../components/modals/SupplierModal';

const SuppliersPage = () => {
  const { suppliers } = useData();
  const { hasPermission } = usePermissions();
  const [showModal, setShowModal] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);

  const handleEdit = (supplier: Supplier) => {
    setSelectedSupplier(supplier);
    setShowModal(true);
  };

  const handleAdd = () => {
    setSelectedSupplier(null);
    setShowModal(true);
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>🚚 Gestión de Proveedores</h2>
          <p className="text-muted">Administra los proveedores de la biblioteca</p>
        </div>
        {hasPermission('canManageSystem') && (
          <Button variant="primary" onClick={handleAdd}>
            <i className="bi bi-plus-circle me-2"></i>
            Nuevo Proveedor
          </Button>
        )}
      </div>

      <Card>
        <Card.Body>
          <Table responsive hover>
            <thead className="table-light">
              <tr>
                <th>Nombre</th>
                <th>Contacto</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>Dirección</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map((supplier: Supplier) => (
                <tr key={supplier.id}>
                  <td><strong>{supplier.name}</strong></td>
                  <td>{supplier.contactPerson}</td>
                  <td>{supplier.email}</td>
                  <td>{supplier.phone}</td>
                  <td>
                    <small className="text-muted">{supplier.address}</small>
                  </td>
                  <td>
                    <Badge bg={supplier.active ? 'success' : 'secondary'}>
                      {supplier.active ? 'Activo' : 'Inactivo'}
                    </Badge>
                  </td>
                  <td>
                    {hasPermission('canManageSystem') && (
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => handleEdit(supplier)}
                      >
                        <i className="bi bi-pencil"></i>
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {suppliers.length === 0 && (
            <div className="text-center py-5 text-muted">
              <i className="bi bi-inbox" style={{ fontSize: '3rem' }}></i>
              <p className="mt-3">No hay proveedores registrados</p>
            </div>
          )}
        </Card.Body>
      </Card>

      {showModal && (
        <SupplierModal
          show={showModal}
          onHide={() => setShowModal(false)}
          supplier={selectedSupplier}
        />
      )}
    </>
  );
};

export default SuppliersPage;
