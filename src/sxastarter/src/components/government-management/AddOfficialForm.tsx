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

const PRESIGNED_UPLOAD_URL = gql`
  mutation UploadMedia($itemPath: String!) {
    uploadMedia(input: { itemPath: $itemPath }) {
      presignedUploadUrl
    }
  }
`;

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
  const [bioPhoto, setBioPhoto] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  //const [response, setResponse] = useState<GovernmentOfficialResponse | null>(null);

  const mappedSexItems = sexItems.map((item) => ({
    id: item.id,
    label: item.displayName,
  }));

  // Apollo's useMutation hook for handling the mutation
  const [presignedUploadUrl] = useMutation(PRESIGNED_UPLOAD_URL);
  const [createGovernmentOfficial] = useMutation(CREATE_GOVERNMENT_OFFICIAL);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const itemName = removeAccents(fullName);

    try {
      const bioPhotoPath = `Project/Demo/Government Management/Teste/${itemName}`;

      // Generate a presigned URL for uploading media to the newly created folder using the relative path
      const presignedUploadUrlResponse = await presignedUploadUrl({
        variables: { itemPath: bioPhotoPath },
      });

      const presignedUrl = presignedUploadUrlResponse?.data?.uploadMedia?.presignedUploadUrl;
      console.log('presignedUrl', presignedUrl);

      const formData = new FormData();
      if (bioPhoto) {
        formData.append('file', bioPhoto);
      }

      try {
        const requestUploadMedia = await fetch(presignedUrl, {
          method: 'POST',
          headers: {
            Authorization:
              'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InpnbnhyQk9IaXJ0WXp4dnl1WVhNZyJ9.eyJodHRwczovL2F1dGguc2l0ZWNvcmVjbG91ZC5pby9jbGFpbXMvb3JnX2lkIjoib3JnX3VCTllMUGNrS293QzQ4aWgiLCJodHRwczovL2F1dGguc2l0ZWNvcmVjbG91ZC5pby9jbGFpbXMvb3JnX25hbWUiOiJub2VzaXMtMSIsImh0dHBzOi8vYXV0aC5zaXRlY29yZWNsb3VkLmlvL2NsYWltcy9vcmdfZGlzcGxheV9uYW1lIjoiTm9lc2lzIiwiaHR0cHM6Ly9hdXRoLnNpdGVjb3JlY2xvdWQuaW8vY2xhaW1zL29yZ19hY2NvdW50X2lkIjoiMDAxM20wMDAwMmt2b0x3QUFJIiwiaHR0cHM6Ly9hdXRoLnNpdGVjb3JlY2xvdWQuaW8vY2xhaW1zL29yZ190eXBlIjoicGFydG5lciIsImh0dHBzOi8vYXV0aC5zaXRlY29yZWNsb3VkLmlvL2NsYWltcy9lbWFpbCI6IndpbGxpa2VyLmMuY2FybW9Abm9lc2lzLnB0IiwiaHR0cHM6Ly9hdXRoLnNpdGVjb3JlY2xvdWQuaW8vY2xhaW1zL3JvbGVzIjpbIltHbG9iYWxdXFxFdmVyeW9uZSIsIltPcmdhbml6YXRpb25dXFxPcmdhbml6YXRpb24gQWRtaW4iXSwiaHR0cHM6Ly9hdXRoLnNpdGVjb3JlY2xvdWQuaW8vY2xhaW1zL2NsaWVudF9uYW1lIjoiWE0gQ2xvdWQgRGVwbG95IChDTEkpIiwiaXNzIjoiaHR0cHM6Ly9hdXRoLnNpdGVjb3JlY2xvdWQuaW8vIiwic3ViIjoiYXV0aDB8NjY4ZmZmMTg2NTc1YmRlYjc2MjAyMTI0IiwiYXVkIjpbImh0dHBzOi8vYXBpLnNpdGVjb3JlY2xvdWQuaW8iLCJodHRwczovL29uZS1zYy1wcm9kdWN0aW9uLmV1LmF1dGgwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE3MjQ0ODc5NTYsImV4cCI6MTcyNDU3NDM1Niwic2NvcGUiOiJvcGVuaWQgZW1haWwgcHJvZmlsZSBvZmZsaW5lX2FjY2VzcyBpZGVudGl0eS51c2VyOnJlYWQgaWRlbnRpdHkudXNlcjp1cGRhdGUgaWRlbnRpdHkudXNlcl9vcmdhbml6YXRpb25zOnJlYWQgYmFja2JvbmUuZXZlbnRzOnJlYWQgY29ubmVjdC50b2tlbnM6Y3JlYXRlIGNvbm5lY3QucG9ydGFsOnJlYWQgcGxhdGZvcm0ucmVnaW9uczpsaXN0IGlkZW50aXR5LnVzZXJfcm9sZXM6cmVhZCBpZGVudGl0eS5vcmdhbml6YXRpb246cmVhZCBpZGVudGl0eS5vcmdhbml6YXRpb246dXBkYXRlIGlkZW50aXR5Lm9yZ2FuaXphdGlvbl9pbnZpdGF0aW9uczpsaXN0IGlkZW50aXR5Lm9yZ2FuaXphdGlvbl9pbnZpdGF0aW9uczpjcmVhdGUgaWRlbnRpdHkub3JnYW5pemF0aW9uX2ludml0YXRpb25zOnJlYWQgaWRlbnRpdHkub3JnYW5pemF0aW9uX2ludml0YXRpb25zOmRlbGV0ZSBpZGVudGl0eS5vcmdhbml6YXRpb25fbWVtYmVyczpsaXN0IGlkZW50aXR5Lm9yZ2FuaXphdGlvbl9tZW1iZXJzOnJlYWQgaWRlbnRpdHkub3JnYW5pemF0aW9uX21lbWJlcnM6ZGVsZXRlIGlkZW50aXR5Lm9yZ2FuaXphdGlvbl9tZW1iZXJzX3JvbGVzOmNyZWF0ZSBpZGVudGl0eS5vcmdhbml6YXRpb25fbWVtYmVyc19yb2xlczpkZWxldGUgaWRlbnRpdHkucm9sZXM6bGlzdCBpZGVudGl0eS5yb2xlczpyZWFkIGlkZW50aXR5Lm9yZ19jb25uZWN0aW9uczpyZWFkIGlkZW50aXR5Lm9yZ19jb25uZWN0aW9uczp3cml0ZSB4bWNsb3VkZGVwbG95LnByb2plY3RzOm1hbmFnZSB4bWNsb3VkZGVwbG95LmVudmlyb25tZW50czptYW5hZ2UgeG1jbG91ZGRlcGxveS5vcmdhbml6YXRpb25zOm1hbmFnZSB4bWNsb3VkZGVwbG95LmRlcGxveW1lbnRzOm1hbmFnZSB4bWNsb3VkZGVwbG95Lm1vbml0b3JpbmcuZGVwbG95bWVudHM6cmVhZCB4bWNsb3VkZGVwbG95LmNsaWVudHM6bWFuYWdlIHhtY2xvdWRkZXBsb3kuc291cmNlY29udHJvbDptYW5hZ2UgeG1jbG91ZGRlcGxveS5yaDptbmcgeG1jbG91ZGRlcGxveS5zaXRlOm1uZyB4bWNsb3VkLmNtOmFkbWluIHhtY2xvdWQuY206bG9naW4gY29ubmVjdC53ZWJob29rczpyZWFkIGNvbm5lY3Qud2ViaG9va3M6Y3JlYXRlIGNvbm5lY3Qud2ViaG9va3M6dXBkYXRlIGNvbm5lY3Qud2ViaG9va3M6ZGVsZXRlIHBsYXRmb3JtLnRlbmFudHM6bGlzdGFsbCBiYWNrYm9uZS5ldmVudHM6ZW5hYmxlIGJhY2tib25lLmV2ZW50czpkaXNhYmxlIGJhY2tib25lLmF1ZGl0OnJlYWQgYmFja2JvbmUuc291cmNla2V5czpjcmVhdGUgYmFja2JvbmUuc291cmNla2V5czpyZWFkIGJhY2tib25lLnNvdXJjZWtleXM6ZGVsZXRlIHVpLmV4dGVuc2lvbnM6cmVhZCBlZGdlLnRva2VuczpjcmVhdGUgZWRnZS50b2tlbnM6cmVhZCBlZGdlLnRva2VuczpkZWxldGUgZWRnZS50b2tlbnM6dXBkYXRlIGhjLm1nbW50LnR5cGVzOndyaXRlIGhjLm1nbW50LmFwaWtleXM6bWFuYWdlIGhjLm1nbW50LnR5cGVzOnJlYWQgaGMubWdtbnQubWVkaWE6bWFuYWdlIGhjLm1nbW50LnN0YXRlczpwdWJsaXNoIGhjLm1nbW50Lml0ZW1zOm1hbmFnZSBoYy5tZ21udC51c2VyczpyZWFkIGhjLm1nbW50LmNsaWVudHM6cmVhZCBoYy5tZ21udC50YXhvbm9taWVzOnJlYWQgaGMubWdtbnQudGF4b25vbWllczp3cml0ZSBoYy5tZ21udC5sb2NhbGVzOnIgaGMubWdtbnQubG9jYWxlczp3IGhjLm1nbW50LnNldHRpbmdzOnIgaGMubWdtbnQuc2V0dGluZ3M6bSBtbXMudXBsb2FkLmZpbGU6YWRkIG1tcy51cGxvYWQuZmlsZTpyZW1vdmUgYmFja2JvbmUuY29udGFjdDpwdWJsaXNoIGJhY2tib25lLmNvbnRhY3Q6c3Vic2NyaWJlIGJhY2tib25lLnNlc3Npb246cHVibGlzaCBiYWNrYm9uZS5zZXNzaW9uOnN1YnNjcmliZSBiYWNrYm9uZS5vcmRlcjpwdWJsaXNoIGJhY2tib25lLm9yZGVyOnN1YnNjcmliZSBiYWNrYm9uZS5vcmRlcmxpbmU6cHVibGlzaCBiYWNrYm9uZS5vcmRlcmxpbmU6c3Vic2NyaWJlIGJhY2tib25lLnBhZ2U6cHVibGlzaCBiYWNrYm9uZS5wYWdlOnN1YnNjcmliZSBiYWNrYm9uZS5wcm9kdWN0OnB1Ymxpc2ggYmFja2JvbmUucHJvZHVjdDpzdWJzY3JpYmUgYmFja2JvbmUuY3VzdG9tOnB1Ymxpc2ggYmFja2JvbmUuY3VzdG9tOnN1YnNjcmliZSBjbXAuc2l0ZXM6Y3JlYXRlIGNtcC5zaXRlczpyZWFkIGNtcC5jb2xsZWN0aW9uczpjcmVhdGUgY21wLmNvbGxlY3Rpb25zOnJlYWQgY21wLmNvbGxlY3Rpb25zOmRlbGV0ZSBjbXAuY29tcG9uZW50czpjcmVhdGUgY21wLmNvbXBvbmVudHM6cmVhZCBjbXAuY29tcG9uZW50czpkZWxldGUgY21wLmRhdGFzb3VyY2VzOmNyZWF0ZSBjbXAuZGF0YXNvdXJjZXM6cmVhZCBjbXAuZGF0YXNvdXJjZXM6ZGVsZXRlIGNtcC5zdHlsZXM6cmVhZCBjbXAuc3R5bGVzOnVwZGF0ZSBjbXAuc3R5bGVzOmRlbGV0ZSBjbXAucHJveHk6cmVhZCBjbXAuYmxvYnM6Y3JlYXRlIHN1cHBvcnQudGlja2V0czpjcmVhdGUgc2VhcmNoLnBvcnRhbDptYW5hZ2Ugc2VhcmNoLmRpc2NvdmVyOm1hbmFnZSBzZWFyY2guYWRtaW46bWFuYWdlIHNlYXJjaC5pbnRlcm5hbDptYW5hZ2Ugc2VhcmNoLnV0aWw6bWFuYWdlIHNlYXJjaC5hY2NvdW50Om1hbmFnZSBkaXNjb3Zlci5wb3J0YWw6bWFuYWdlIGRpc2NvdmVyLnNlYXJjaC1yZWM6bWFuYWdlIGRpc2NvdmVyLmFkbWluOm1hbmFnZSBkaXNjb3Zlci5pbnRlcm5hbDptYW5hZ2UgZGlzY292ZXIudXRpbDptYW5hZ2UgZGlzY292ZXIuZXZlbnQ6bWFuYWdlIGRpc2NvdmVyLmFjY291bnQ6bWFuYWdlIGZvcm1zLmVuZHBvaW50czpyZWFkIGZvcm1zLmVuZHBvaW50czpjcmVhdGUgZm9ybXMuZW5kcG9pbnRzOnVwZGF0ZSBmb3Jtcy5lbmRwb2ludHM6ZGVsZXRlIGZvcm1zLnN1Ym1pc3Npb25zOnJlYWQgZm9ybXMuc3VibWlzc2lvbnM6Y3JlYXRlIGZvcm1zLnN1Ym1pc3Npb25zOnVwZGF0ZSBmb3Jtcy5zdWJtaXNzaW9uczpkZWxldGUgZm9ybXMuZXhwb3J0czpjcmVhdGUgZm9ybXMuZXhwb3J0czpyZWFkIGF1ZGl0LmxvZ3M6ciBjb25uZWN0Lm9yZzpyIGNvbm5lY3Qub3JnLnRudDpyIGNvbm5lY3QucmNwOmMgY29ubmVjdC5yY3A6ciBjb25uZWN0LnJjcDp1IGNvbm5lY3QucmNwOmQgY29ubmVjdC5jb246YyBjb25uZWN0LmNvbjpyIGNvbm5lY3QuY29uOnUgY29ubmVjdC5jb246ZCBjb25uZWN0LmZsZHI6YyBjb25uZWN0LmZsZHI6ciBjb25uZWN0LmZsZHI6ZCBjb25uZWN0LmxjbC5pbXA6YyBjb25uZWN0LmxjbC5pbXA6ciBjb25uZWN0LmxjbC5leHA6YyBjb25uZWN0LmxjbC5leHA6ciBjb25uZWN0LnByb2o6ciBjb25uZWN0LnByb2o6ZCBlcC5hZG1uLm9yZ3MuaHN0bm1lOnIgZXAuYWRtbi5vcmdzLmhzdG5tZTp3IHhtYXBwcy5jb250ZW50OmdlbiBhaS5vcmcuYnJkOnIgYWkub3JnLmJyZDp3IGFpLm9yZy5lZzpyIGFpLm9yZy5lZzp3IGFpLm9yZy5jaHRzOnIgYWkub3JnLmNodHM6dyBhaS5vcmcuZG9jczpyIGFpLm9yZy5kb2NzOncgYWkuZ2VuLmNtcDpyIGFpLmdlbi5jbXA6dyBhaS5yZWMudmFyOncgYWkucmVjLnZhcjpyIGFpLnJlYy5oeXA6dyBhaS5yZWMuaHlwOnIgYWkub3JnOmFkbWluIiwiYXpwIjoiQ2hpOEV3ZkZuRWVqa3NrM1NlZDlobGFsR2lNOUIydjcifQ.fQQTgyNO5B3GobVQyyK74U7Ka7RWrPCLNEZVsMub637Fv7ZPeHwLfjiXK9zB6a6Toskfa5vvRMmmylTQgTguE9xE8SSB9cig7u7zBuvLiPUclUbvjZ7pdxWio8X9eIvccjvdhHlw_Kdt7QaNzWdLJVhwK_1oFgqYYzSSHjUIu4wMi4HlvP3-hiE1UEIvJ9Im3CQi3LCQMAxiDXXH25fBd3lyHA-uL7kncLOmL_FbTmge-dgblLrpOC4GqgM8-uiTUKhxJiZlBSlerz3XyqkW62td8S84Pk1wD4A4lIB5NCGPnYuB7OO0wNzfGJ0kztPL0a4I43Z4pz9yXUzLTn430Q',
          },
          body: formData,
        });

        const responseUploadMedia = await requestUploadMedia.json();

        console.log('responseUploadMedia', responseUploadMedia);
      } catch (error) {
        console.error('Failed to upload media:', error);
      }

      const result = await createGovernmentOfficial({
        variables: {
          itemName,
          fullName,
          sexId: formatUUID(selectedSex),
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
          onChange={(e) => setBioPhoto(e.target.files?.[0] || null)}
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
