import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'usama@yahoo.com',
    password: bcrypt.hashSync('12345', 10),
    isAdmin: true,
  },
  {
    name: 'salman',
    email: 'salman@yahoo.com',
    password: bcrypt.hashSync('12345', 10),
  },
  {
    name: 'ali',
    email: 'ali@yahoo.com',
    password: bcrypt.hashSync('12345', 10),
  },
];

export default users;
