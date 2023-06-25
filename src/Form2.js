import React, { useState } from 'react';

const Form = ({ onSubmit }) => {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData((prevData) => ({ ...prevData, [name]: newValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({});
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="name" className="form-label">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-input"
            value={formData.name || ''}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-input"
            value={formData.email || ''}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-input"
            value={formData.password || ''}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="phone" className="form-label">
            Phone:
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="form-input"
            value={formData.phone || ''}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="dropdown" className="form-label">
            Dropdown:
          </label>
          <select
            id="dropdown"
            name="dropdown"
            className="form-input"
            value={formData.dropdown || ''}
            onChange={handleChange}
            required
          >
            <option value="">Select an option</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        </div>
        <div className="form-field">
          <label className="form-label">Radio Button:</label>
          <label htmlFor="radioOption1">
            <input
              type="radio"
              id="radioOption1"
              name="radio"
              value="option1"
              checked={formData.radio === 'option1'}
              onChange={handleChange}
            />
            Option 1
          </label>
          <label htmlFor="radioOption2">
            <input
              type="radio"
              id="radioOption2"
              name="radio"
              value="option2"
              checked={formData.radio === 'option2'}
              onChange={handleChange}
            />
            Option 2
          </label>
          <label htmlFor="radioOption3">
            <input
              type="radio"
              id="radioOption3"
              name="radio"
              value="option3"
              checked={formData.radio ==='option3'}
              onChange={handleChange}
            />
            Option 3
          </label>
        </div>
        <div className="form-field">
          <label className="form-label">Checkbox:</label>
          <label htmlFor="checkboxOption1">
            <input
              type="checkbox"
              id="checkboxOption1"
              name="checkboxOption1"
              value="option1"
              checked={formData.checkboxOption1}
              onChange={handleChange}
            />
            Option 1
          </label>
          <label htmlFor="checkboxOption2">
            <input
              type="checkbox"
              id="checkboxOption2"
              name="checkboxOption2"
              value="option2"
              checked={formData.checkboxOption2}
              onChange={handleChange}
            />
            Option 2
          </label>
          <label htmlFor="checkboxOption3">
            <input
              type="checkbox"
              id="checkboxOption3"
              name="checkboxOption3"
              value="option3"
              checked={formData.checkboxOption3}
              onChange={handleChange}
            />
            Option 3
          </label>
        </div>
        <button type="submit" className="form-submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;

