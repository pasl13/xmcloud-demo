import React, { useMemo, useState } from 'react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import dynamic from 'next/dynamic';

// Third-party utilities
import { Tab, Tabs } from '@nextui-org/react';
import removeAccents from 'remove-accents';
import 'react-quill/dist/quill.snow.css';

// Custom components
import Dropdown from 'src/atoms/Shared Components/Dropdown';
import FileUpload from 'src/atoms/Shared Components/FileUpload';

// Custom utilities
import { generatePresignedUrlAndUpload } from 'src/utils/uploadMedia';
import SitecoreGuidUtils from 'src/utils/sitecoreGuid';

interface AddOfficialFormProps {
  onAddOfficial: (officialId: string, officialName: string) => void;
  parent?: string;
  language?: string;
  sexItems: { id: string; displayName: string }[];
}

const CREATE_GOVERNMENT_OFFICIAL = gql`
  mutation CreateGovernmentOfficial(
    $itemName: String!
    $fullName: String!
    $sexId: String!
    $bio: String!
    $bioPhoto: String!
    $cardPhoto: String!
    $templateId: ID!
    $parent: ID!
  ) {
    createItem(
      input: {
        name: $itemName
        fields: [
          { name: "FullName", value: $fullName }
          { name: "Sex", value: $sexId }
          { name: "Bio", value: $bio }
          { name: "BioPhoto", value: $bioPhoto }
          { name: "CardPhoto", value: $cardPhoto }
        ]
        templateId: $templateId
        parent: $parent
        language: "pt"
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

const ADD_ITEM_VERSION_EN = gql`
  mutation AddItemVersionEn($itemId: ID!) {
    addItemVersion(input: { itemId: $itemId, language: "en" }) {
      item {
        itemId
      }
    }
  }
`;

const UPDATE_ITEM_EN = gql`
  mutation UpdateItemEn($itemId: ID!, $bio: String!) {
    updateItem(input: { itemId: $itemId, fields: [{ name: "Bio", value: $bio }], language: "en" }) {
      item {
        itemId
      }
    }
  }
`;

const PRESIGNED_UPLOAD_URL = gql`
  mutation UploadMedia($itemPath: String!, $alt: String!) {
    uploadMedia(input: { itemPath: $itemPath, alt: $alt }) {
      presignedUploadUrl
    }
  }
`;

const AddOfficialForm = ({
  onAddOfficial,
  parent,
  sexItems,
}: AddOfficialFormProps): JSX.Element => {
  const [fullName, setFullName] = useState<string>('');
  const [selectedSex, setSelectedSex] = useState<string>('');
  const [bio, setBio] = useState<string>('');
  const [bioEn, setBioEn] = useState<string>('');
  const [bioPhoto, setBioPhoto] = useState<File | null>(null);
  const [cardPhoto, setCardPhoto] = useState<File | null>(null);
  const [selectedBioKey, setSelectedBioKey] = useState<string>('bio-pt');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }), []);

  const [presignedUploadUrl] = useMutation(PRESIGNED_UPLOAD_URL);
  const [createGovernmentOfficial] = useMutation(CREATE_GOVERNMENT_OFFICIAL);
  const [addItemVersionEn] = useMutation(ADD_ITEM_VERSION_EN);
  const [updateItemEn] = useMutation(UPDATE_ITEM_EN);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const itemName = removeAccents(fullName);

    try {
      const bioPhotoUrl = await generatePresignedUrlAndUpload(
        presignedUploadUrl,
        'Project/Demo/Government Management/Bio Photo',
        itemName,
        bioPhoto
      );

      const cardPhotoUrl = await generatePresignedUrlAndUpload(
        presignedUploadUrl,
        'Project/Demo/Government Management/Card Photo',
        itemName,
        cardPhoto
      );

      const response = await createGovernmentOfficial({
        variables: {
          itemName,
          fullName,
          sexId: SitecoreGuidUtils.convertRawToGuid(selectedSex),
          bio,
          bioPhoto: `<image mediaid="${SitecoreGuidUtils.convertRawHyphenatedToGuid(
            bioPhotoUrl?.Id
          )}" />`,
          cardPhoto: `<image mediaid="${SitecoreGuidUtils.convertRawHyphenatedToGuid(
            cardPhotoUrl?.Id
          )}" />`,
          templateId: '{3F331F63-E5A3-4B22-B4E5-1AA7F42C5C48}',
          parent,
        },
      });

      const newOfficial = response.data?.createItem?.item;

      if (newOfficial) {
        await addItemVersionEn({
          variables: {
            itemId: newOfficial.itemId,
          },
        });

        await updateItemEn({
          variables: {
            itemId: newOfficial.itemId,
            bio: bioEn,
          },
        });

        onAddOfficial(newOfficial.itemId, newOfficial.name);

        setFullName('');
        setSelectedSex('');
        setBio('');
        setBioEn('');
        setBioPhoto(null);
        setCardPhoto(null);
        setErrorMessage(null);
      }
    } catch (error: unknown) {
      if (error instanceof Error && error.message.includes('The item name')) {
        setErrorMessage('The name already exists, please choose another.');
      } else {
        setErrorMessage('An error occurred while adding the official. Please try again.');
      }
    }
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
          required
        />
      </div>

      <Dropdown
        id="sex"
        label="Select Sex:"
        value={selectedSex}
        options={sexItems.map(({ id, displayName }) => ({ id, label: displayName }))}
        placeholder="-- Select --"
        onSelect={setSelectedSex}
        labelClass="block text-lg font-medium text-gray-700"
        selectClass="mt-2 block w-full p-3 text-lg border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        required
      />

      <div>
        <Tabs
          aria-label="Official Bio Tabs"
          selectedKey={selectedBioKey}
          onSelectionChange={(key) => setSelectedBioKey(key as string)}
        >
          <Tab key="bio-pt" title="Bio [PT]">
            <ReactQuill theme="snow" value={bio} onChange={setBio} />
          </Tab>
          <Tab key="bio-en" title="Bio [EN]">
            <ReactQuill theme="snow" value={bioEn} onChange={setBioEn} />
          </Tab>
        </Tabs>
      </div>

      <FileUpload
        id="bioPhoto"
        accept="image/*"
        label="Bio Photo:"
        labelClass="block text-lg font-medium text-gray-700"
        inputClass="mt-2 block w-full p-3 text-lg border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        onFileSelect={setBioPhoto}
        required
      />

      <FileUpload
        id="cardPhoto"
        accept="image/*"
        label="Card Photo:"
        labelClass="block text-lg font-medium text-gray-700"
        inputClass="mt-2 block w-full p-3 text-lg border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        onFileSelect={setCardPhoto}
        required
      />

      <button
        type="submit"
        className="w-full px-6 py-3 bg-indigo-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Add Official
      </button>

      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
    </form>
  );
};

export default AddOfficialForm;
