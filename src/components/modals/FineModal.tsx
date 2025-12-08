import { Modal, Form, Button, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Fine, Member } from '../../models';

interface FineModalProps {
  show: boolean;
  onHide: () => void;
  fine?: Fine | null;
}

const FineModal = ({ show, onHide, fine }: FineModalProps) => {
  const { members, addFine, updateFine } = useData();
  
  const [formData, setFormData] = useState({
    memberId: fine?.memberId || '',
    loanId: fine?.loanId || '',
    amount: fine?.amount || 0,
    reason: fine?.reason || '',
    status: fine?.status || 'pending' as 'pending' | 'paid',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newFine = new Fine(
      fine?.id || Date.now().toString(),
      formData.memberId,
      formData.loanId,
      formData.amount,
      formData.reason,
      new Date(),
      formData.status
    );

    if (fine) {
      await updateFine(newFine);
    } else {
      await addFine(newFine);
    }
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          <i className="bi bi-cash-coin me-2"></i>
          {fine ? 'Editar Multa' : 'Registrar Nueva Multa'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Miembro *</Form.Label>
            <Form.Select
              value={formData.memberId}
              onChange={(e) => setFormData({ ...formData, memberId: e.target.value })}
              required
            >
              <option value="">Seleccionar miembro</option>
              {members.map((member: Member) => (
                <option key={member.id} value={member.id}>
                  {member.fullName} - {member.email}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>ID del Préstamo</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.loanId}
                  onChange={(e) => setFormData({ ...formData, loanId: e.target.value })}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Monto *</Form.Label>
                <Form.Control
                  type="number"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) })}
                  required
                  min="0"
                  step="0.01"
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Motivo *</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Estado</Form.Label>
            <Form.Select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as 'pending' | 'paid' })}
            >
              <option value="pending">Pendiente</option>
              <option value="paid">Pagada</option>
            </Form.Select>
          </Form.Group>

          <div className="d-flex justify-content-end gap-2">
            <Button variant="secondary" onClick={onHide}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              {fine ? 'Actualizar' : 'Guardar'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default FineModal;
