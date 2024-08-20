import React, { useState } from 'react';
import client from 'src/config/apolloClient';

interface GovernmentOfficialResponse {
  createItem: {
    item: {
      itemId: string;
      name: string;
      path: string;
    };
  };
}

type AddGovernmentOfficialFormProps = {
  onAddOfficial: (name: string) => void;
};

const AddGovernmentOfficial = ({ onAddOfficial }: AddGovernmentOfficialFormProps): JSX.Element => {
  const [name, setName] = useState<string>('');
  const [response, setResponse] = useState<GovernmentOfficialResponse | null>(null); // Tipagem correta para a resposta

  const templateId = '{3234C01C-183D-45E5-80D1-BADFB58536A0}';
  const parentId = '{1AB3F54B-AB1B-4B40-90FF-517A726F7A32}';
  const language = 'en';

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const mutation = `
      mutation CreateSimpleGovernmentOfficial($name: String!, $templateId: ID!, $parent: ID!, $language: String!) {
        createItem(
          input: {
            name: $name,
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

    const variables = { name, templateId, parent: parentId, language };

    try {
      const data = await client.request<GovernmentOfficialResponse>(mutation, variables); // Definindo o tipo da resposta aqui
      setResponse(data);

      onAddOfficial(name);

      setName('');
    } catch (error) {
      console.error('Error:', error);
      setResponse(null); // Definindo null em caso de erro
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add Government Official</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="form-group">
          <label htmlFor="officialName">Name:</label>
          <input
            type="text"
            className="form-control"
            id="officialName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
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
