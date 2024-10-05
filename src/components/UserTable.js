// src/components/UserTable.js
import React from 'react';
import { Link } from 'react-router-dom';

const UserTable = ({ users, onEdit, onDelete }) => {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
            <td>
              <button onClick={() => onEdit(user)} className="btn btn-primary">Edit</button>
              <button onClick={() => onDelete(user.id)} className="btn btn-danger">Delete</button>
              
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
