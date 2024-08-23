import React, { useMemo, useState } from 'react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import dynamic from 'next/dynamic';
import { formatUUID } from 'src/utils/formatUUID';
import Dropdown from 'src/atoms/Shared Components/Dropdown';
import removeAccents from 'remove-accents';
import 'react-quill/dist/quill.snow.css';

interface AddOfficialFormProps {
  onAddOfficial: (officialId: string, officialName: string) => void;
  parent: string | undefined;
  language: string | undefined;
  sexItems: { id: string; displayName: string }[];
}

const CREATE_GOVERNMENT_OFFICIAL = gql`
  mutation CreateGovernmentOfficial(
    $itemName: String!
    $fullName: String!
    $sexId: String!
    $bio: String!
    $templateId: ID!
    $parent: ID!
    $language: String!
  ) {
    createItem(
      input: {
        name: $itemName
        fields: [
          { name: "FullName", value: $fullName }
          { name: "Sex", value: $sexId }
          { name: "Bio", value: $bio }
        ]
        templateId: $templateId
        parent: $parent
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

const CREATE_MEDIA_FOLDER = gql`
  mutation CreateMediaFolder(
    $itemName: String!
    $templateId: ID!
    $parent: ID!
    $language: String!
  ) {
    createItem(
      input: { name: $itemName, templateId: $templateId, parent: $parent, language: $language }
    ) {
      item {
        itemId
        name
        path
      }
    }
  }
`;

// const UPLOAD_MEDIA_MUTATION = gql`
//   mutation UploadMedia($itemPath: String!) {
//     uploadMedia(input: { itemPath: $itemPath }) {
//       presignedUploadUrl
//     }
//   }
// `;

const AddOfficialForm = ({
  onAddOfficial,
  parent,
  language,
  sexItems,
}: AddOfficialFormProps): JSX.Element => {
  const [fullName, setFullName] = useState<string>('');
  const [selectedSex, setSelectedSex] = useState<string>('');
  const [bio, setBio] = useState<string>('');
  const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }), []);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  //const [response, setResponse] = useState<GovernmentOfficialResponse | null>(null);

  const mappedSexItems = sexItems.map((item) => ({
    id: item.id,
    label: item.displayName,
  }));

  // Apollo's useMutation hook for handling the mutation
  const [createMediaFolder] = useMutation(CREATE_MEDIA_FOLDER);
  //const [uploadMedia] = useMutation(UPLOAD_MEDIA_MUTATION);
  const [createGovernmentOfficial] = useMutation(CREATE_GOVERNMENT_OFFICIAL);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // TODO: Refactor
    const sexId = formatUUID(selectedSex);
    const itemName = removeAccents(fullName);

    try {
      const mediaFolderResponse = await createMediaFolder({
        variables: {
          itemName,
          templateId: '{FE5DD826-48C6-436D-B87A-7C4210C7413B}',
          parent: '{75FDD89B-A990-4604-BB4C-4DCF6B878EEA}',
          language,
        },
      });

      console.log('mediaFolderResponse', mediaFolderResponse);

      const result = await createGovernmentOfficial({
        variables: {
          itemName,
          fullName,
          sexId,
          bio,
          templateId: '{3F331F63-E5A3-4B22-B4E5-1AA7F42C5C48}',
          parent,
          language,
        },
      });

      // Extract the new official's ID and name from the mutation response
      const newOfficial = result.data?.createItem?.item;

      // Call the callback to notify the parent component about the new official
      if (newOfficial) {
        onAddOfficial(newOfficial.itemId, newOfficial.name);

        // Reset fields after submit
        setFullName('');
        setSelectedSex('');
        setBio('');
        setErrorMessage('');
      }
    } catch (error: unknown) {
      if (error instanceof Error && error.message.includes('The item name')) {
        setErrorMessage('The name already exists, please choose another.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 border rounded-lg shadow-md bg-white">
      <h2 className="text-2xl font-semibold">Add New Official</h2>

      {/* Full Name */}
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
          required
        />
      </div>

      {/* Dropdown to select sex */}
      <Dropdown
        id="sex"
        label="Select Sex:"
        value={selectedSex}
        options={mappedSexItems}
        placeholder="-- Select --"
        onSelect={(selectedValue) => setSelectedSex(selectedValue)}
        labelClass="block text-lg font-medium text-gray-700"
        selectClass="mt-2 block w-full p-3 text-lg border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        required={true}
      />

      {/* Rich Text Editor for Bio */}
      <div>
        <label htmlFor="bio" className="block text-lg font-medium text-gray-700">
          Bio:
        </label>
        <ReactQuill theme="snow" value={bio} onChange={setBio} />
      </div>

      {/* File Upload for Images */}
      <div>
        <label htmlFor="bioPhoto" className="block text-lg font-medium text-gray-700">
          Profile Image:
        </label>
        <input
          type="file"
          id="bioPhoto"
          accept="image/*"
          onChange={(e) => {
            const files = e.target.files;
            if (!files || files.length === 0) {
              return;
            }
            const file = files[0];
            if (!file.type.startsWith('image/')) {
              alert('Please upload a valid image file.');
              e.target.value = ''; // Reset the input
            }
          }}
          className="mt-2 block w-full p-3 text-lg border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full px-6 py-3 bg-indigo-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Add Official
      </button>

      {/* Display the error message if it exists */}
      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
    </form>
  );
};

export default AddOfficialForm;
