export const mockUsers = [
  {
    id: 1,
    username: 'superadmin',
    password: 'admin123',
    role: 'superadmin',
    name: 'Super Admin',
    email: 'superadmin@bdu.edu.et',
    faculty: null
  },
  {
    id: 2,
    username: 'computing_admin',
    password: 'comp123',
    role: 'subadmin',
    name: 'Computing Admin',
    email: 'computing@bdu.edu.et',
    faculty: 'computing'
  },
  {
    id: 3,
    username: 'electrical_admin',
    password: 'elec123',
    role: 'subadmin',
    name: 'Electrical Admin',
    email: 'electrical@bdu.edu.et',
    faculty: 'electrical-computer'
  },
  {
    id: 4,
    username: 'student1',
    password: 'student123',
    role: 'user',
    name: 'John Doe',
    email: 'john@student.bdu.edu.et',
    faculty: 'computing'
  },
  {
    id: 5,
    username: 'student2',
    password: 'student123',
    role: 'user',
    name: 'Jane Smith',
    email: 'jane@student.bdu.edu.et',
    faculty: 'electrical-computer'
  }
];