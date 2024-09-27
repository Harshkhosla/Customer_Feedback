"use client"; // Ensure the component runs on the client

import { useState, useEffect } from 'react';
import axios from '../../lib/axios';
import { User } from '../../lib/types';

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]); // Explicitly typing users array
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  // Fetch users from the backend
  const fetchUsers = async () => {
    try {
      const response = await axios.get('/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users', error);
    }
  };

  // Handle user creation
  const handleCreateUser = async () => {
    try {
      await axios.post('/users', { name, email });
      fetchUsers(); // Refresh the user list after creation
    } catch (error) {
      console.error('Error creating user', error);
    }
  };

  // Fetch users initially on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white p-6 shadow-md rounded-md">
        <h1 className="text-2xl mb-4 font-bold">Users</h1>

        <div className="flex gap-4 mb-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
          <button
            onClick={handleCreateUser}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Create User
          </button>
        </div>

        <h2 className="text-xl mb-4 font-bold">User List</h2>

        {/* Scrollable table for user list */}
        <div className="max-h-64 overflow-y-auto border border-gray-300 rounded-md">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm">
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-100">
                  <td className="py-2 px-4">{user.name}</td>
                  <td className="py-2 px-4">{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Conditional message if no users exist */}
        {users.length === 0 && (
          <p className="mt-4 text-gray-500">No users available.</p>
        )}
      </div>
    </div>
  );
};

export default UsersPage;
