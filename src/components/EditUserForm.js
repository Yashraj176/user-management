// src/components/EditUserForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EditUserForm.css'; // Import the CSS for styling

const EditUserForm = ({ user, setUsers, onCancel }) => {
  const [formData, setFormData] = useState(user);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData(user);
  }, [user]);

  const validate = () => {
    const newErrors = {};
    if (!formData.name || formData.name.length < 3) {
      newErrors.name = "Name is required and should be at least 3 characters.";
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailPattern.test(formData.email)) {
      newErrors.email = "Valid email is required.";
    }
    const phonePattern = /^\d{10}$/; // Adjust according to your phone validation
    if (!formData.phone || !phonePattern.test(formData.phone)) {
      newErrors.phone = "Valid phone number is required.";
    }
    if (!formData.address.street || !formData.address.city) {
      newErrors.address = "Address (Street, City) is required.";
    }
    if (formData.company && formData.company.length < 3) {
      newErrors.company = "Company name must be at least 3 characters.";
    }
    if (formData.website && !/^https?:\/\/[^\s]+$/.test(formData.website)) {
      newErrors.website = "Valid URL is required if provided.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await axios.put(`https://jsonplaceholder.typicode.com/users/${user.id}`, formData);
        setUsers(prev => prev.map(u => (u.id === user.id ? response.data : u)));
        onCancel(); // Close the form
      } catch (error) {
        alert('Error updating user');
      }
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit User</h2>
        <form onSubmit={handleUpdate}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={errors.name ? 'error-input' : ''}
              placeholder="Enter user name"
            />
            {errors.name && <p className="error">{errors.name}</p>}
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={errors.email ? 'error-input' : ''}
              placeholder="Enter user email"
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className={errors.phone ? 'error-input' : ''}
              placeholder="Enter user phone number"
            />
            {errors.phone && <p className="error">{errors.phone}</p>}
          </div>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={`USER-${formData.username}`}
              readOnly
              className="readonly-input"
            />
          </div>
          <div className="form-group">
            <label>Address (Street)</label>
            <input
              type="text"
              value={formData.address.street}
              onChange={(e) => setFormData({ ...formData, address: { ...formData.address, street: e.target.value } })}
              className={errors.address ? 'error-input' : ''}
              placeholder="Enter street"
            />
            {errors.address && <p className="error">{errors.address}</p>}
          </div>
          <div className="form-group">
            <label>Address (City)</label>
            <input
              type="text"
              value={formData.address.city}
              onChange={(e) => setFormData({ ...formData, address: { ...formData.address, city: e.target.value } })}
              placeholder="Enter city"
            />
          </div>
          <div className="form-group">
            <label>Company Name</label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              placeholder="Enter company name (optional)"
            />
            {errors.company && <p className="error">{errors.company}</p>}
          </div>
          <div className="form-group">
            <label>Website</label>
            <input
              type="url"
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              placeholder="Enter website URL (optional)"
            />
            {errors.website && <p className="error">{errors.website}</p>}
          </div>
          <div className="button-group">
            <button type="submit" className="btn">Update User</button>
            <button type="button" className="btn cancel" onClick={onCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserForm;
