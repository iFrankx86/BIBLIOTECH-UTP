import { Modal, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useData } from '../../shared/context/DataContext';
import { Member, User } from '../../shared/types';
import { usersAPI } from '../../shared/services/api';
import { isValidEmail, isValidPhone, isValidDNI, isNotEmpty } from '../../shared/utils';

interface MemberModalProps {
  show: boolean;
  onHide: () => void;
  member?: Member;
  readOnly?: boolean;
}

const MemberModal = ({ show, onHide, member, readOnly = false }: MemberModalProps) => {
  const { addMember, updateMember } = useData();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: member?.firstName || '',
    lastName: member?.lastName || '',
    email: member?.email || '',
    phone: member?.phone || '',
    address: member?.address || '',
    membershipType: (member?.membershipType || 'basic') as 'basic' | 'premium' | 'vip',
    idNumber: member?.idNumber || '',
    active: member?.active ?? true,
    username: '',
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    setFormData({
      firstName: member?.firstName || '',
      lastName: member?.lastName || '',
      email: member?.email || '',
      phone: member?.phone || '',
      address: member?.address || '',
      membershipType: (member?.membershipType || 'basic') as 'basic' | 'premium' | 'vip',
      idNumber: member?.idNumber || '',
      active: member?.active ?? true,
      username: '',
      password: '',
      confirmPassword: '',
    });
    setError('');
  }, [member, show]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (readOnly) {
      onHide();
      return;
    }

    // Validaciones de campos
    if (!isNotEmpty(formData.firstName)) {
      setError('El nombre es requerido');
      return;
    }
    
    if (!isNotEmpty(formData.lastName)) {
      setError('El apellido es requerido');
      return;
    }
    
    if (!isValidEmail(formData.email)) {
      setError('El email no es válido (ej: usuario@ejemplo.com)');
      return;
    }
    
    if (!isValidPhone(formData.phone)) {
      setError('El teléfono debe tener 9 dígitos (ej: 987654321) o con código 51');
      return;
    }
    
    if (!isValidDNI(formData.idNumber)) {
      setError('El DNI debe tener exactamente 8 dígitos');
      return;
    }
    
    if (!isNotEmpty(formData.address)) {
      setError('La dirección es requerida');
      return;
    }
    
    // Validar credenciales solo al crear nuevo miembro
    if (!member) {
      if (!formData.username || !formData.password) {
        setError('Usuario y contraseña son requeridos para nuevos miembros');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Las contraseñas no coinciden');
        return;
      }
      if (formData.password.length < 6) {
        setError('La contraseña debe tener al menos 6 caracteres');
        return;
      }
    }

    setLoading(true);
    
    try {
      if (member) {
        // Update existing member
        const updatedMember = new Member(
          member.id,
          formData.firstName,
          formData.lastName,
          formData.email,
          formData.phone,
          formData.address,
          formData.membershipType,
          formData.idNumber,
          formData.active
        );
        updatedMember.membershipDate = member.membershipDate;
        await updateMember(updatedMember);
      } else {
        // Create new member
        const newMember = new Member(
          Date.now().toString(),
          formData.firstName,
          formData.lastName,
          formData.email,
          formData.phone,
          formData.address,
          formData.membershipType,
          formData.idNumber,
          formData.active
        );
        await addMember(newMember);
        
        // Crear usuario asociado para login
        const newUser = new User(
          Date.now().toString(),
          formData.username,
          formData.password,
          formData.email,
          'member',
          `${formData.firstName} ${formData.lastName}`,
          true
        );
        
        await usersAPI.create(newUser);
      }
      
      onHide();
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        membershipType: 'basic',
        idNumber: '',
        active: true,
        username: '',
        password: '',
        confirmPassword: '',
      });
    } catch (err) {
      setError('Error al guardar el miembro. Por favor intente nuevamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const modalTitle = member ? (readOnly ? 'Detalle de Miembro' : 'Editar Miembro') : 'Agregar Nuevo Miembro';

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          <i className="bi bi-person-plus me-2"></i>
          {modalTitle}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {error && <Alert variant="danger">{error}</Alert>}
          
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Nombre *</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  required
                  disabled={readOnly}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Apellido *</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  required
                  disabled={readOnly}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Email *</Form.Label>
                <Form.Control
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  disabled={readOnly}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Teléfono *</Form.Label>
                <Form.Control
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  disabled={readOnly}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Número de Identificación *</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.idNumber}
                  onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })}
                  required
                  disabled={readOnly}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Tipo de Membresía *</Form.Label>
                <Form.Select
                  value={formData.membershipType}
                  onChange={(e) => setFormData({ ...formData, membershipType: e.target.value as 'basic' | 'premium' | 'vip' })}
                  required
                  disabled={readOnly}
                >
                  <option value="basic">Básica</option>
                  <option value="premium">Premium</option>
                  <option value="vip">VIP</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Dirección *</Form.Label>
            <Form.Control
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              required
              disabled={readOnly}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Check
              type="switch"
              id="member-active"
              label={formData.active ? 'Miembro Activo' : 'Miembro Inactivo'}
              checked={formData.active}
              onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
              disabled={readOnly}
            />
          </Form.Group>

          {!member && !readOnly && (
            <>
              <hr />
              <h6 className="mb-3">
                <i className="bi bi-key me-2"></i>
                Credenciales de Acceso al Sistema
              </h6>
              <Row>
                <Col md={12}>
                  <Form.Group className="mb-3">
                    <Form.Label>Nombre de Usuario *</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.username}
                      onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                      required={!member}
                      placeholder="Ej: juanperez"
                    />
                    <Form.Text className="text-muted">
                      Este usuario se utilizará para iniciar sesión en el sistema
                    </Form.Text>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Contraseña *</Form.Label>
                    <Form.Control
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required={!member}
                      minLength={6}
                      placeholder="Mínimo 6 caracteres"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Confirmar Contraseña *</Form.Label>
                    <Form.Control
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      required={!member}
                      minLength={6}
                      placeholder="Repita la contraseña"
                    />
                  </Form.Group>
                </Col>
              </Row>
            </>
          )}

          <div className="d-flex justify-content-end gap-2 mt-3">
            <Button variant="secondary" onClick={onHide} disabled={loading}>
              {readOnly ? 'Cerrar' : 'Cancelar'}
            </Button>
            {!readOnly && (
              <Button variant="primary" type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Guardando...
                  </>
                ) : (
                  <>{member ? 'Actualizar' : 'Guardar'} Miembro</>
                )}
              </Button>
            )}
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default MemberModal;
