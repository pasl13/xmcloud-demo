import React, { useState } from 'react';

const AddGovernmentOfficialForm = (): JSX.Element => {
  const [fullName, setFullName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [bio, setBio] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Aqui você poderia adicionar a lógica para lidar com os dados do formulário, como enviá-los para um servidor, etc.
    console.log({
      fullName,
      firstName,
      lastName,
      gender,
      bio,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="fullName">Full Name:</label>
        <input
          id="fullName"
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="firstName">First Name:</label>
        <input
          id="firstName"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="lastName">Last Name:</label>
        <input
          id="lastName"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="gender">Gender:</label>
        <select id="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div>
        <label htmlFor="bio">Bio:</label>
        <textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} />
      </div>
      <button type="submit">Add Official</button>
    </form>
  );
};

export default AddGovernmentOfficialForm;
