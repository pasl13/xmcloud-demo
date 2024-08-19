import React, { useState } from 'react';
import client from 'src/config/apolloClient'

type AddGovernmentOfficialFormProps = {
  onAddOfficial: (name: string) => void;
};

const AddGovernmentOfficial = ({ onAddOfficial }: AddGovernmentOfficialFormProps): JSX.Element => {
  const [name, setName] = useState<string>('');
  const [response, setResponse] = useState<any>(null);

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
      const data = await client.request(mutation, variables);
      setResponse(data);

      onAddOfficial(name);

      setName('');
    } catch (error) {
      console.error('Error:', error);
      setResponse(error);
    }
  };

  return (
    <div>
      <h2>Add Government Official</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit">Add Official</button>
      </form>
      {response && (
        <div>
          <h3>Response:</h3>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default AddGovernmentOfficial;
