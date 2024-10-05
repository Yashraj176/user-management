// src/components/UserDetail.js
import React from 'react';

const UserDetail = ({ user }) => {
  return (
    <div>
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <p>Address: {user.address.street}, {user.address.city}</p>
      <p>Company: {user.company}</p>
      <p>Website: {user.website}</p>
    </div>
  );
};

export default UserDetail;
