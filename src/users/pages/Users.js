import React from 'react';

import UsersList from '../components/UsersList';

const USERS = [
  {
    id:'u1',
    name: 'Sharath Kumar',
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    places: 5,
    desc: ['Agra', 'Alapuzzha', 'Kanyakumari', 'Ajmer', 'Whitefield']
  },
  {
    id:'u2',
    name: 'John Doe',
    image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    places: 1,
    desc: ['Mangalore']
  },
  {
    id:'u3',
    name: 'Jane Davis',
    image: 'https://images.pexels.com/photos/259865/pexels-photo-259865.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    places: 2,
    desc: ['Alapuzzha', 'Kanyakumari']
  },
  {
    id:'u4',
    name: 'Jim Goodsberg',
    image: 'https://images.pexels.com/photos/220458/pexels-photo-220458.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    places: 3,
    desc: ['Pink City', 'Murudeshwar', 'Manali']
  },
];

const Users = () => {

  return (
      <UsersList items={USERS}/>
  );
}

export default Users;