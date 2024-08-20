import React, { useState } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { formatUUID } from 'src/utils/formatUUID';

type AddGovernmentOfficialFormProps = {
  onAddOfficial: (name: string) => void;
};

const GET_GENDERS = gql`
  query GetGenders {
    item(
      where: { path: "/sitecore/content/Demo/Demo/Data/Collections/Genders" }
    ) {
      children {
        edges {
          node {
            name
            itemId
          }
        }
      }
    }
  }
`;

const CREATE_SIMPLE_GOVERNMENT_OFFICIAL = gql`
  mutation CreateSimpleGovernmentOfficial(
    $fullName: String!, 
    $firstName: String!, 
    $lastName: String!, 
    $genderId: ID!, 
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
          { name: "Sex", value: $genderId }  # Pass genderId as the value for the "Sex" field
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

const AddGovernmentOfficial = ({ onAddOfficial }: AddGovernmentOfficialFormProps): JSX.Element => {
  const [fullName, setFullName] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [genderId, setGenderId] = useState<string>(''); // Store the selected gender's itemId
  const [response, setResponse] = useState<any>(null);

  const templateId = '{3234C01C-183D-45E5-80D1-BADFB58536A0}';
  const parentId = '{1AB3F54B-AB1B-4B40-90FF-517A726F7A32}';
  const language = 'en';

  // Fetch genders from the GraphQL query
  const { data, loading: gendersLoading, error: gendersError } = useQuery(GET_GENDERS);

  // Apollo's useMutation hook for handling the mutation
  const [createGovernmentOfficial, { loading, error }] = useMutation(CREATE_SIMPLE_GOVERNMENT_OFFICIAL);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const result = await createGovernmentOfficial({
        variables: { fullName, firstName, lastName, genderId, templateId, parent: parentId, language },
      });
      setResponse(result.data);

      // Call the callback to notify parent component
      onAddOfficial(fullName);

      // Reset fields after submit
      setFullName('');
      setFirstName('');
      setLastName('');
      setGenderId('');
    } catch (e) {
      console.error('Error:', e);
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
            value={genderId} // Set to the selected gender's itemId
            onChange={(e) => setGenderId(e.target.value)} // Update genderId on change
            required
          >
            <option value="">Select Gender</option>
            {gendersLoading ? (
              <option>Loading...</option>
            ) : (
              data?.item?.children?.edges.map(({ node }: any) => (
                <option key={node.itemId} value={formatUUID(node.itemId)}>
                  {node.name}
                </option>
              ))
            )}
          </select>
        </div>

        <button type="submit" className="btn btn-primary mt-3" disabled={loading}>
          {loading ? 'Adding...' : 'Add Official'}
        </button>
      </form>

      {response && (
        <div className="alert alert-info" role="alert">
          <h4 className="alert-heading">Response:</h4>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}

      {error && (
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error:</h4>
          <pre>{JSON.stringify(error.message, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default AddGovernmentOfficial;
