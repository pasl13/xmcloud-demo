import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React, { useState } from 'react';

interface AddOfficialFormProps {
  onAddOfficial: (officialName: string) => void;
  templateId: string | undefined;
  parent: string | undefined;
  language: string | undefined;
}

interface GovernmentOfficialResponse {
  createItem: {
    item: {
      itemId: string;
      name: string;
      path: string;
    };
  };
}

const CREATE_GOVERNMENT_OFFICIAL = gql`
  mutation CreateGovernmentOfficial(
    $fullName: String!
    $templateId: ID!
    $parent: ID!
    $language: String!
  ) {
    createItem(
      input: { name: $fullName, templateId: $templateId, parent: $parent, language: $language }
    ) {
      item {
        itemId
        name
        path
      }
    }
  }
`;

const AddOfficialForm = ({
  onAddOfficial,
  parent,
  templateId,
  language,
}: AddOfficialFormProps): JSX.Element => {
  const [fullName, setFullName] = useState<string>('');
  const [response, setResponse] = useState<GovernmentOfficialResponse | null>(null);

  // Apollo's useMutation hook for handling the mutation
  const [createGovernmentOfficial] = useMutation(CREATE_GOVERNMENT_OFFICIAL);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await createGovernmentOfficial({
      variables: {
        fullName,
        templateId,
        parent,
        language,
      },
    });
    setResponse(result.data);

    // Call the callback to notify parent component
    onAddOfficial(fullName);

    // Reset fields after submit
    setFullName('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 border rounded-lg shadow-md bg-white">
      <h2 className="text-2xl font-semibold">Add New Official</h2>
      <div>
        <label htmlFor="fullName" className="block text-lg font-medium text-gray-700">
          Full Name:
        </label>
        <input
          type="text"
          id="fullName"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="mt-2 block w-full p-3 text-lg border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <button
        type="submit"
        className="w-full px-6 py-3 bg-indigo-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Add Official
      </button>
    </form>
  );
};

export default AddOfficialForm;
