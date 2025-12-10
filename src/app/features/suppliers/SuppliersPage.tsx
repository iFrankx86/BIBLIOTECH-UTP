import { useState } from 'react';
import { Card, Table, Button, Badge } from 'react-bootstrap';
import { useData } from '../../shared/context/DataContext';
import { usePermissions } from '../../shared/hooks/usePermissions';
import { Supplier } from '../../shared/types';
import SupplierModal from './SupplierModal';

const SuppliersPage = () => {
  const { suppliers, updateSupplier, deleteSupplier } = useData();
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

  const handleToggleActive = async (supplier: Supplier) => {
    const updated = new Supplier(
      supplier.id,
      supplier.name,
      supplier.contactPerson,
      supplier.email,
      supplier.phone,
      supplier.address,
      supplier.taxId,
      !supplier.active,
      supplier.rating
    );
    if (supplier.website) updated.website = supplier.website;
    await updateSupplier(updated);
  };

  const handleDelete = async (supplier: Supplier) => {
    const confirmed = window.confirm(`¿Eliminar al proveedor ${supplier.name}? Esta acción no se puede deshacer.`);
    if (!confirmed) return;
    await deleteSupplier(supplier.id);
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
                  <td className="d-flex gap-2">
                    {hasPermission('canManageSystem') && (
                      <>
                        <Button
                          variant={supplier.active ? 'outline-success' : 'outline-secondary'}
                          size="sm"
                          title={supplier.active ? 'Desactivar proveedor' : 'Activar proveedor'}
                          onClick={() => handleToggleActive(supplier)}
                        >
                          <i className={supplier.active ? 'bi bi-toggle-on' : 'bi bi-toggle-off'}></i>
                        </Button>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => handleEdit(supplier)}
                        >
                          <i className="bi bi-pencil"></i>
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleDelete(supplier)}
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
