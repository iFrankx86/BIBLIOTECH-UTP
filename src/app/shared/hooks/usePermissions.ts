import { useAuth } from '../context/AuthContext';

// Definición de permisos por rol
export const PERMISSIONS = {
  // Permisos de Admin - Control total
  admin: {
    canViewDashboard: true,
    canManageBooks: true,
    canManageMembers: true,
    canManageLoans: true,
    canManageReservations: true,
    canManageFines: true,
    canManageCategories: true,
    canManageAuthors: true,
    canManagePublishers: true,
    canManageUsers: true,
    canViewReports: true,
    canManageSystem: true,
  },
  // Permisos de Bibliotecario - Operaciones diarias
  librarian: {
    canViewDashboard: true,
    canManageBooks: true,          // Puede registrar libros
    canManageMembers: true,         // Puede agregar nuevos miembros
    canManageLoans: true,           // Puede realizar préstamos
    canManageReservations: true,    // Puede gestionar reservas
    canManageFines: true,           // Puede gestionar multas
    canManageCategories: true,      // Puede gestionar categorías
    canManageAuthors: true,         // Puede gestionar autores
    canManagePublishers: true,      // Puede gestionar editoriales
    canViewReports: true,           // Puede ver reportes
    canManageUsers: false,          // NO puede gestionar usuarios del sistema
    canManageSystem: false,         // NO puede cambiar configuración del sistema
  },
  // Permisos de Miembro - Vista de cliente
  member: {
    canViewDashboard: true,         // Dashboard personalizado
    canViewBooks: true,             // Puede ver catálogo de libros
    canMakeReservations: true,      // Puede hacer reservas
    canViewOwnLoans: true,          // Puede ver su historial de préstamos
    canViewOwnFines: true,          // Puede ver sus multas
    canViewOwnProfile: true,        // Puede ver su perfil
    canManageBooks: false,          // NO puede gestionar libros
    canManageMembers: false,        // NO puede gestionar miembros
    canManageLoans: false,          // NO puede gestionar préstamos de otros
    canManageFines: false,          // NO puede gestionar multas de otros
    canManageCategories: false,
    canManageAuthors: false,
    canManagePublishers: false,
    canViewReports: false,
    canManageUsers: false,
    canManageSystem: false,
  },
};

export const usePermissions = () => {
  const { user } = useAuth();

  const getPermissions = () => {
    if (!user) return PERMISSIONS.member;
    return PERMISSIONS[user.role] || PERMISSIONS.member;
  };

  const hasPermission = (permission: keyof typeof PERMISSIONS.admin): boolean => {
    const permissions = getPermissions();
    return permissions[permission as keyof typeof permissions] || false;
  };

  const canAccess = (resource: string): boolean => {
    const accessMap: Record<string, keyof typeof PERMISSIONS.admin> = {
      'books': 'canManageBooks',
      'members': 'canManageMembers',
      'loans': 'canManageLoans',
      'reservations': 'canManageReservations',
      'fines': 'canManageFines',
      'categories': 'canManageCategories',
      'authors': 'canManageAuthors',
      'publishers': 'canManagePublishers',
      'users': 'canManageUsers',
    };

    const permissionKey = accessMap[resource];
    return permissionKey ? hasPermission(permissionKey) : false;
  };

  return {
    permissions: getPermissions(),
    hasPermission,
    canAccess,
    role: user?.role || 'member',
  };
};
