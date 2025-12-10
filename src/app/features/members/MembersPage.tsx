import { useState } from 'react';
import { Card, Table, Badge, Button, ButtonGroup, Form, InputGroup } from 'react-bootstrap';
import { useData } from '../../shared/context/DataContext';
import { usePermissions } from '../../shared/hooks/usePermissions';
import { Member } from '../../shared/types';
import MemberModal from './MemberModal';
import { formatShortDate } from '../../shared/utils';


const MembersPage = () => {
  const { members, deleteMember, updateMember } = useData();
  const { hasPermission } = usePermissions();
  const [showModal, setShowModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [modalMode, setModalMode] = useState<'view' | 'edit' | 'create'>('create');
  const [searchTerm, setSearchTerm] = useState('');

  // Filtrado de miembros
  const filteredMembers = members.filter((member: Member) => {
    if (!searchTerm) return true;
    const search = searchTerm.toLowerCase();
    return member.fullName.toLowerCase().includes(search) ||
           member.email.toLowerCase().includes(search) ||
           member.phone.toLowerCase().includes(search) ||
           member.idNumber.toLowerCase().includes(search) ||
           member.membershipType.toLowerCase().includes(search);
  });

  const toggleActive = async (member: Member) => {
    const updated = new Member(
      member.id,
      member.firstName,
      member.lastName,
      member.email,
      member.phone,
      member.address,
      member.membershipType,
      member.idNumber,
      !member.active
    );
    updated.membershipDate = member.membershipDate;
    await updateMember(updated);
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>👥 Gestión de Miembros</h2>
          <p className="text-muted">Administra los miembros de la biblioteca</p>
        </div>
        {hasPermission('canManageMembers') && (
          <Button
            variant="primary"
            onClick={() => {
              setSelectedMember(null);
              setModalMode('create');
              setShowModal(true);
            }}
          >
            <i className="bi bi-plus-circle me-2"></i>
            Nuevo Miembro
          </Button>
        )}
      </div>

      <Card>
        <Card.Body>
          <InputGroup className="mb-3">
            <InputGroup.Text>
              <i className="bi bi-search"></i>
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Buscar por nombre, email, teléfono, ID o tipo de membresía..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <Button variant="outline-secondary" onClick={() => setSearchTerm('')}>
                <i className="bi bi-x-circle"></i>
              </Button>
            )}
          </InputGroup>

          {filteredMembers.length === 0 && searchTerm && (
            <div className="text-center text-muted my-4">
              <i className="bi bi-search" style={{ fontSize: '2rem' }}></i>
              <p className="mt-2">No se encontraron miembros que coincidan con "{searchTerm}"</p>
            </div>
          )}

          <Table responsive hover>
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Nombre Completo</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>Tipo de Membresía</th>
                <th>Fecha de Registro</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.map((member: Member) => (
                <tr key={member.id}>
                  <td><code>{member.idNumber}</code></td>
                  <td><strong>{member.fullName}</strong></td>
                  <td>{member.email}</td>
                  <td>{member.phone}</td>
                  <td>
                    <Badge bg={
                      member.membershipType === 'vip' ? 'warning' :
                      member.membershipType === 'premium' ? 'info' : 'secondary'
                    }>
                      {member.membershipType.toUpperCase()}
                    </Badge>
                  </td>
                  <td>{formatShortDate(member.membershipDate)}</td>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <Badge bg={member.active ? 'success' : 'danger'}>
                        {member.active ? 'Activo' : 'Inactivo'}
                      </Badge>
                      {hasPermission('canManageMembers') && (
                        <Button
                          size="sm"
                          variant={member.active ? 'outline-danger' : 'outline-success'}
                          onClick={() => toggleActive(member)}
                        >
                          {member.active ? 'Desactivar' : 'Activar'}
                        </Button>
                      )}
                    </div>
                  </td>
                  <td>
                    <ButtonGroup size="sm">
                      <Button
                        variant="outline-info"
                        onClick={() => {
                          setSelectedMember(member);
                          setModalMode('view');
                          setShowModal(true);
                        }}
                      >
                        <i className="bi bi-eye"></i>
                      </Button>
                      {hasPermission('canManageMembers') && (
                        <>
                          <Button
                            variant="outline-primary"
                            onClick={() => {
                              setSelectedMember(member);
                              setModalMode('edit');
                              setShowModal(true);
                            }}
                          >
                            <i className="bi bi-pencil"></i>
                          </Button>
                          <Button
                            variant="outline-danger"
                            onClick={() => {
                              if (window.confirm('¿Eliminar este miembro?')) {
                                deleteMember(member.id);
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
          {members.length === 0 && (
            <div className="text-center py-5 text-muted">
              <i className="bi bi-inbox" style={{ fontSize: '3rem' }}></i>
              <p className="mt-3">No hay miembros registrados</p>
            </div>
          )}
        </Card.Body>
      </Card>

      <MemberModal
        show={showModal}
        onHide={() => setShowModal(false)}
        member={selectedMember ?? undefined}
        readOnly={modalMode === 'view'}
      />
    </>
  );
};

export default MembersPage;
