import React, { useState } from 'react';
import axios from 'axios';
import './AddUserForm.css';

const AddUserForm = ({ onClose, onUserAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    username: '',
    address: {
      street: '',
      city: ''
    },
    company: {
      name: ''
    },
    website: ''
  });

  const [errors, setErrors] = useState({});

  // Input change handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Address input handler
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      address: {
        ...formData.address,
        [name]: value
      }
    });
  };

  // Company input handler
  const handleCompanyChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      company: {
        ...formData.company,
        [name]: value
      }
    });
  };

  // Validation function
  const validateForm = () => {
    const newErrors = {};
    if (formData.name.length < 3) newErrors.name = 'Name must be at least 3 characters';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (formData.phone.length < 10) newErrors.phone = 'Phone number must be valid';
    if (formData.address.street === '') newErrors.street = 'Street is required';
    if (formData.address.city === '') newErrors.city = 'City is required';
    if (formData.company.name && formData.company.name.length < 3) newErrors.company = 'Company name must be at least 3 characters if provided';
    if (formData.website && !/^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,6}\/?$/.test(formData.website)) newErrors.website = 'Website URL is invalid';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const newUser = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      username: `USER-${formData.name}`,
      address: {
        street: formData.address.street,
        city: formData.address.city,
      },
      company: {
        name: formData.company.name,
      },
      website: formData.website,
    };

    // Simulate API POST request
    axios.post('https://jsonplaceholder.typicode.com/users', newUser)
      .then(response => {
        onUserAdded(response.data); // Notify parent component
        onClose(); // Close the modal
      })
      .catch(error => {
        console.error('Error adding user', error);
        alert('There was an error adding the user.');
      });
  };

  return (
    <div className="add-user-form">
      <h2>Add New User</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={errors.name ? 'error-input' : ''}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={errors.email ? 'error-input' : ''}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className={errors.phone ? 'error-input' : ''}
          />
          {errors.phone && <p className="error">{errors.phone}</p>}
        </div>

        <div className="form-group">
          <label>Street</label>
          <input
            type="text"
            name="street"
            value={formData.address.street}
            onChange={handleAddressChange}
            className={errors.street ? 'error-input' : ''}
          />
          {errors.street && <p className="error">{errors.street}</p>}
        </div>

        <div className="form-group">
          <label>City</label>
          <input
            type="text"
            name="city"
            value={formData.address.city}
            onChange={handleAddressChange}
            className={errors.city ? 'error-input' : ''}
          />
          {errors.city && <p className="error">{errors.city}</p>}
        </div>

        <div className="form-group">
          <label>Company Name (Optional)</label>
          <input
            type="text"
            name="name"
            value={formData.company.name}
            onChange={handleCompanyChange}
            className={errors.company ? 'error-input' : ''}
          />
          {errors.company && <p className="error">{errors.company}</p>}
        </div>

        <div className="form-group">
          <label>Website (Optional)</label>
          <input
            type="text"
            name="website"
            value={formData.website}
            onChange={handleInputChange}
            className={errors.website ? 'error-input' : ''}
          />
          {errors.website && <p className="error">{errors.website}</p>}
        </div>

        <div className="button-group">
          <button type="submit" className="btn">Add User</button>
          <button type="button" className="btn cancel" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default AddUserForm;
