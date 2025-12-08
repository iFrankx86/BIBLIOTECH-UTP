import { Card, Table, Badge } from 'react-bootstrap';
import { useData } from '../context/DataContext';
import { Member } from '../models';

const MembersPage = () => {
  const { members } = useData();

  return (
    <>
      <div className="mb-4">
        <h2>👥 Gestión de Miembros</h2>
        <p className="text-muted">Administra los miembros de la biblioteca</p>
      </div>

      <Card>
        <Card.Body>
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
              </tr>
            </thead>
            <tbody>
              {members.map((member: Member) => (
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
                  <td>{new Date(member.membershipDate).toLocaleDateString()}</td>
                  <td>
                    <Badge bg={member.active ? 'success' : 'danger'}>
                      {member.active ? 'Activo' : 'Inactivo'}
                    </Badge>
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
    </>
  );
};

export default MembersPage;
