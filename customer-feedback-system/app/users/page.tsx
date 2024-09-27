"use client"
import { useState, useEffect } from 'react';
import axios from '../../lib/axios';
import { User } from '../../lib/types';

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]); // Explicitly typing users array
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users', error);
    }
  };

  const handleCreateUser = async () => {
    try {
      await axios.post('/users', { name, email });
      fetchUsers(); // Refresh the user list after creation
    } catch (error) {
      console.error('Error creating user', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Users</h1>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleCreateUser}>Create User</button>

      <h2>User List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersPage;
