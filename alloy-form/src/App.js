import React, { useState } from 'react';
import axios from 'axios';

const AlloyForm = () => {
  // State variables for form fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [ssn, setSsn] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Data to send to your Flask backend
      const formData = {
        name_first: firstName,
        name_last: lastName,
        address_line_1: addressLine1,
        address_line_2: addressLine2,
        address_city: city,
        address_state: state,
        address_postal_code: zipCode,
        document_ssn: ssn,
        email_address: email,
        birth_date: dob,
      };

      // Reset form state
      const resetForm = () => {
        setFirstName('');
        setLastName('');
        setAddressLine1('');
        setAddressLine2('');
        setCity('');
        setState('');
        setZipCode('');
        setSsn('');
        setEmail('');
        setDob('');
      };

      // Validation logic for each field

      // State (2-letter code)
      if (!/^[A-Z]{2}$/.test(state.trim())) {
        alert('Please enter a valid 2-letter state code.');
        return;
      }

      // SSN (9 digits)
      if (!/^\d{9}$/.test(ssn)) {
        alert('Please enter a valid 9-digit SSN (no dashes).');
        return;
      }

      // Date of Birth (YYYY-MM-DD)
      if (!/^\d{4}-\d{2}-\d{2}$/.test(dob)) {
        alert('Please enter a valid date of birth in the YYYY-MM-DD format.');
        return;
      }

      // Send a POST request to Flask backend
      console.log('Request Payload:', formData);
      const response = await axios.post(
        'http://localhost:5000/submit-applicant',
        formData
      );

      // Log the API response
      console.log('API Response:', response.data);

      // Handle the response from Flask
      if (response.status === 200) {
        console.log('Applicant data submitted successfully');
        resetForm();
      } else {
        console.error('Failed to submit applicant data to Flask backend');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
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
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="addressLine2">Address Line 2:</label>
          <input
            type="text"
            id="addressLine2"
            value={addressLine2}
            onChange={(e) => setAddressLine2(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
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
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="country">Country:</label>
          <div id="country-box">US</div>
        </div>
        <div className="form-group">
          <label htmlFor="ssn">SSN (9 digits):</label>
          <input
            type="text"
            id="ssn"
            value={ssn}
            onChange={(e) => setSsn(e.target.value.replace(/-/g, ''))}
            onKeyDown={(e) => {
              if (e.key === '-') {
                e.preventDefault();
              }
            }}
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
