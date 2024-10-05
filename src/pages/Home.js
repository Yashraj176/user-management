// src/pages/Home.js
import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import UserTable from '../components/UserTable';
import AddUserForm from '../components/AddUserForm';
import EditUserForm from '../components/EditUserForm';
import axios from 'axios';

const Home = () => {
  const { users, setUsers, loading, error } = useContext(UserContext);
  const [editingUser, setEditingUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleEditUser = (user) => {
    setEditingUser(user);
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`https://jsonplaceholder.typicode.com/users/${userId}`);
        setUsers(users.filter(user => user.id !== userId));
      } catch (error) {
        alert('Error deleting user');
      }
    }
  };

  return (
    <div>
      <h1>User Management</h1>
      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {loading ? <p>Loading...</p> : (
        <UserTable users={filteredUsers} onEdit={handleEditUser} onDelete={handleDeleteUser} />
      )}
      {error && <p>{error}</p>}
      <AddUserForm setUsers={setUsers} />
      {editingUser && (
        <EditUserForm user={editingUser} setUsers={setUsers} onCancel={() => setEditingUser(null)} />
      )}
    </div>
  );
};

export default Home;
