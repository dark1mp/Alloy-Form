import React, { useState } from 'react';

const AlloyForm = () => {
  // Define state variables for form fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [country, setCountry] = useState('');
  const [ssn, setSsn] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');

  // Define a function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation logic for each field
    // You can add more specific validation as needed

    // Example validation for State (2-letter code) and SSN (9 digits)
    if (!/^[A-Z]{2}$/.test(state)) {
      alert('Please enter a valid 2-letter state code.');
      return;
    }

    if (!/^\d{9}$/.test(ssn)) {
      alert('Please enter a valid 9-digit SSN (no dashes).');
      return;
    }

    // Validation for other fields can be added similarly

    // If all validations pass, you can proceed with form submission
    // Implement form submission logic here
  };

  return (
    <div className="alloy-form">
      <h2>Alloy Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="addressLine1">Address Line 1:</label>
          <input
            type="text"
            id="addressLine1"
            value={addressLine1}
            onChange={(e) => setAddressLine1(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="addressLine2">Address Line 2:</label>
          <input
            type="text"
            id="addressLine2"
            value={addressLine2}
            onChange={(e) => setAddressLine2(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="state">State (2-letter code):</label>
          <input
            type="text"
            id="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="zipCode">Zip/Postal Code:</label>
          <input
            type="text"
            id="zipCode"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="country">Country (US):</label>
          <input
            type="text"
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="ssn">SSN (9 digits, no dashes):</label>
          <input
            type="text"
            id="ssn"
            value={ssn}
            onChange={(e) => setSsn(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="dob">Date of Birth (YYYY-MM-DD):</label>
          <input
            type="text"
            id="dob"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
        </div>
        <div className="form-group">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AlloyForm;
