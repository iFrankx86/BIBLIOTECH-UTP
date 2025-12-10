import { useState } from 'react';
import { Card, Table, Button, Badge, Dropdown, ButtonGroup } from 'react-bootstrap';
import { useData } from '../../shared/context/DataContext';
import { usePermissions } from '../../shared/hooks/usePermissions';
import { Inventory } from '../../shared/types';
import InventoryModal from './InventoryModal';

const InventoryPage = () => {
  const { inventory, updateInventory, deleteInventory } = useData();
  const { hasPermission } = usePermissions();
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Inventory | null>(null);

  const handleEdit = (item: Inventory) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleAdd = () => {
    setSelectedItem(null);
    setShowModal(true);
  };

  const handleStatusChange = async (item: Inventory, status: Inventory['status']) => {
    const updated = new Inventory(
      item.id,
      item.bookId,
      item.barcode,
      item.location,
      item.condition,
      new Date(item.acquisitionDate),
      item.acquisitionPrice,
      status
    );
    if (item.notes) updated.notes = item.notes;
    await updateInventory(updated);
  };

  const handleDelete = async (item: Inventory) => {
    const confirmed = window.confirm(`¿Eliminar el item ${item.barcode}? Esta acción no se puede deshacer.`);
    if (!confirmed) return;
    await deleteInventory(item.id);
  };

  const totalValue = inventory.reduce((sum: number, item: Inventory) => 
    sum + (item.acquisitionPrice || 0), 0
  );

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>📦 Gestión de Inventario</h2>
          <p className="text-muted">Administra el inventario de materiales y recursos</p>
        </div>
        <div className="d-flex gap-2 align-items-center">
          <div className="text-end me-3">
            <small className="text-muted">Valor Total</small>
            <h4 className="mb-0 text-success">${totalValue.toFixed(2)}</h4>
          </div>
          {hasPermission('canManageSystem') && (
            <Button variant="primary" onClick={handleAdd}>
              <i className="bi bi-plus-circle me-2"></i>
              Nuevo Item
            </Button>
          )}
        </div>
      </div>

      <Card>
        <Card.Body>
          <Table responsive hover>
            <thead className="table-light">
              <tr>
                <th>Código de Barras</th>
                <th>Libro ID</th>
                <th>Ubicación</th>
                <th>Condición</th>
                <th>Estado</th>
                <th>Precio de Adquisición</th>
                <th>Fecha de Adquisición</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((item: Inventory) => (
                <tr key={item.id}>
                  <td><code>{item.barcode}</code></td>
                  <td><code>{item.bookId}</code></td>
                  <td>{item.location}</td>
                  <td>
                    <Badge bg={
                      item.condition === 'excellent' ? 'success' :
                      item.condition === 'good' ? 'info' :
                      item.condition === 'fair' ? 'warning' : 'danger'
                    }>
                      {item.condition === 'excellent' ? 'Excelente' :
                       item.condition === 'good' ? 'Bueno' :
                       item.condition === 'fair' ? 'Regular' :
                       item.condition === 'poor' ? 'Malo' : 'Dañado'}
                    </Badge>
                  </td>
                  <td>
                    <Badge bg={
                      item.status === 'available' ? 'success' :
                      item.status === 'loaned' ? 'primary' :
                      item.status === 'reserved' ? 'warning' :
                      item.status === 'maintenance' ? 'info' : 'danger'
                    }>
                      {item.status === 'available' ? 'Disponible' :
                       item.status === 'loaned' ? 'Prestado' :
                       item.status === 'reserved' ? 'Reservado' :
                       item.status === 'maintenance' ? 'Mantenimiento' : 'Perdido'}
                    </Badge>
                  </td>
                  <td>${item.acquisitionPrice?.toFixed(2) || '0.00'}</td>
                  <td>{new Date(item.acquisitionDate).toLocaleDateString()}</td>
                  <td className="d-flex gap-2">
                    {hasPermission('canManageSystem') && (
                      <>
                        <Dropdown as={ButtonGroup} size="sm">
                          <Button
                            variant="outline-primary"
                            onClick={() => handleEdit(item)}
                          >
                            <i className="bi bi-pencil"></i>
                          </Button>
                          <Dropdown.Toggle split variant="outline-secondary" id={`inv-status-${item.id}`} />
                          <Dropdown.Menu>
                            <Dropdown.Header>Estado rápido</Dropdown.Header>
                            <Dropdown.Item onClick={() => handleStatusChange(item, 'available')}>
                              Disponible
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => handleStatusChange(item, 'loaned')}>
                              Prestado
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => handleStatusChange(item, 'reserved')}>
                              Reservado
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => handleStatusChange(item, 'maintenance')}>
                              Mantenimiento
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={() => handleStatusChange(item, 'lost')} className="text-danger">
                              Perdido
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleDelete(item)}
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
          {inventory.length === 0 && (
            <div className="text-center py-5 text-muted">
              <i className="bi bi-inbox" style={{ fontSize: '3rem' }}></i>
              <p className="mt-3">No hay items en el inventario</p>
            </div>
          )}
        </Card.Body>
      </Card>

      {showModal && (
        <InventoryModal
          show={showModal}
          onHide={() => setShowModal(false)}
          item={selectedItem}
        />
      )}
    </>
  );
};

export default InventoryPage;
