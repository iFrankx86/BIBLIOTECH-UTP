import { Modal, Form, Button, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import { useData } from '../../shared/context/DataContext';
import { Inventory, Book } from '../../shared/types';

interface InventoryModalProps {
  show: boolean;
  onHide: () => void;
  item?: Inventory | null;
}

const InventoryModal = ({ show, onHide, item }: InventoryModalProps) => {
  const { books, addInventory, updateInventory } = useData();
  
  const [formData, setFormData] = useState({
    bookId: item?.bookId || '',
    barcode: item?.barcode || '',
    location: item?.location || '',
    condition: item?.condition || 'good' as 'excellent' | 'good' | 'fair' | 'poor' | 'damaged',
    acquisitionDate: item?.acquisitionDate ? new Date(item.acquisitionDate).toISOString().split('T')[0] : '',
    acquisitionPrice: item?.acquisitionPrice || 0,
    status: item?.status || 'available' as 'available' | 'loaned' | 'reserved' | 'maintenance' | 'lost',
    notes: item?.notes || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newItem = new Inventory(
      item?.id || Date.now().toString(),
      formData.bookId,
      formData.barcode,
      formData.location,
      formData.condition,
      new Date(formData.acquisitionDate),
      formData.acquisitionPrice,
      formData.status
    );

    if (formData.notes) {
      newItem.notes = formData.notes;
    }

    if (item) {
      await updateInventory(newItem);
    } else {
      await addInventory(newItem);
    }
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          <i className="bi bi-box-seam me-2"></i>
          {item ? 'Editar Item de Inventario' : 'Registrar Nuevo Item'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Libro *</Form.Label>
                <Form.Select
                  value={formData.bookId}
                  onChange={(e) => setFormData({ ...formData, bookId: e.target.value })}
                  required
                >
                  <option value="">Seleccionar libro</option>
                  {books.map((book: Book) => (
                    <option key={book.id} value={book.id}>
                      {book.title} - ISBN: {book.isbn}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Código de Barras *</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.barcode}
                  onChange={(e) => setFormData({ ...formData, barcode: e.target.value })}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Ubicación *</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  required
                  placeholder="Ej: Estante A - Nivel 2"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Condición *</Form.Label>
                <Form.Select
                  value={formData.condition}
                  onChange={(e) => setFormData({ ...formData, condition: e.target.value as 'excellent' | 'good' | 'fair' | 'poor' | 'damaged' })}
                  required
                >
                  <option value="excellent">Excelente</option>
                  <option value="good">Bueno</option>
                  <option value="fair">Regular</option>
                  <option value="poor">Malo</option>
                  <option value="damaged">Dañado</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Fecha de Adquisición *</Form.Label>
                <Form.Control
                  type="date"
                  value={formData.acquisitionDate}
                  onChange={(e) => setFormData({ ...formData, acquisitionDate: e.target.value })}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Precio de Adquisición *</Form.Label>
                <Form.Control
                  type="number"
                  value={formData.acquisitionPrice}
                  onChange={(e) => setFormData({ ...formData, acquisitionPrice: parseFloat(e.target.value) })}
                  required
                  min="0"
                  step="0.01"
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Estado *</Form.Label>
                <Form.Select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as 'available' | 'loaned' | 'reserved' | 'maintenance' | 'lost' })}
                  required
                >
                  <option value="available">Disponible</option>
                  <option value="loaned">Prestado</option>
                  <option value="reserved">Reservado</option>
                  <option value="maintenance">Mantenimiento</option>
                  <option value="lost">Perdido</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Notas</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            />
          </Form.Group>

          <div className="d-flex justify-content-end gap-2">
            <Button variant="secondary" onClick={onHide}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              {item ? 'Actualizar' : 'Guardar'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default InventoryModal;
