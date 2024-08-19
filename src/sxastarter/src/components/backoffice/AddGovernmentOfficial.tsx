import gql from 'graphql-tag';
import React, { useState } from 'react';
import client from 'src/config/apolloClient';

type AddGovernmentOfficialFormProps = {
  onAddOfficial: (name: string) => void;
};

const AddGovernmentOfficial = ({ onAddOfficial }: AddGovernmentOfficialFormProps): JSX.Element => {
  const [fullName, setFullName] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [sex, setSex] = useState<string>('');
  const [response, setResponse] = useState<any>(null);

  const templateId = '{3234C01C-183D-45E5-80D1-BADFB58536A0}';
  const parentId = '{1AB3F54B-AB1B-4B40-90FF-517A726F7A32}';
  const language = 'en';

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const mutation = gql`
      mutation CreateSimpleGovernmentOfficial(
        $fullName: String!, 
        $firstName: String!, 
        $lastName: String!, 
        $sex: String!, 
        $templateId: ID!, 
        $parent: ID!, 
        $language: String!
      ) {
        createItem(
          input: {
            name: $fullName,
            fields: [
              { name: "First Name", value: $firstName },
              { name: "Last Name", value: $lastName },
              { name: "Sex", value: $sex }
            ],
            templateId: $templateId,
            parent: $parent,
            language: $language
          }
        ) {
          item {
            itemId
            name
            path
          }
        }
      }
    `;

    const variables = { fullName, firstName, lastName, sex, templateId, parent: parentId, language };

    try {
      const data = await client.request(mutation, variables);
      setResponse(data);

      onAddOfficial(fullName);

      // Reset fields after submit
      setFullName('');
      setFirstName('');
      setLastName('');
      setSex('');
    } catch (error) {
      console.error('Error:', error);
      setResponse(error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add Government Official</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="form-group">
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            className="form-control"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            className="form-control"
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
            className="form-control"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="sex">Sex:</label>
          <select
            className="form-control"
            id="sex"
            value={sex}
            onChange={(e) => setSex(e.target.value)}
            required
          >
            <option value="">Select Sex</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary mt-3">
          Add Official
        </button>
      </form>
      {response && (
        <div className="alert alert-info" role="alert">
          <h4 className="alert-heading">Response:</h4>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default AddGovernmentOfficial;