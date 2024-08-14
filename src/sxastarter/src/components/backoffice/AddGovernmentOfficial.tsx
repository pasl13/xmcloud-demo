import React, { useState } from 'react';

const AddGovernmentOfficialForm = (): JSX.Element => {
  const [fullName, setFullName] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Aqui você poderia adicionar a lógica para lidar com os dados do formulário, como enviá-los para um servidor, etc.
    console.log({
      fullName,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
      <div className="form-group">
        <label htmlFor="fullName">Full Name:</label>
        <input
          id="fullName"
          type="text"
          className="form-control"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary mt-3">
        Add Official
      </button>
    </form>
  );
};

export default AddGovernmentOfficialForm;
