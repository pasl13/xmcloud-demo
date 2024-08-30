import React, { useMemo, useState } from 'react';
import { Button, Tab, Tabs } from '@nextui-org/react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import gql from 'graphql-tag';
import removeAccents from 'remove-accents';
import { useMutation } from '@apollo/client';

interface AddConstitutionalGovernmentProps {
  onAddGovernment: (
    itemId?: string,
    title?: string,
    titleEn?: string,
    startDate?: string,
    endDate?: string
  ) => void;
}

const CREATE_CONSTITUTIONAL_GOVERNMENT = gql`
  mutation CreateConstitutionalGovernment(
    $itemName: String!
    $title: String!
    $logo: String!
    $description: String!
    $startDate: String!
    $endDate: String!
    $templateId: ID!
    $parent: ID!
  ) {
    createItem(
      input: {
        name: $itemName
        fields: [
          { name: "Title", value: $title }
          { name: "Logo", value: $logo }
          { name: "Description", value: $description }
          { name: "StartDate", value: $startDate }
          { name: "EndDate", value: $endDate }
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
  mutation UpdateItemEn($itemId: ID!, $title: String!, $description: String!) {
    updateItem(
      input: {
        itemId: $itemId
        fields: [{ name: "Title", value: $title }, { name: "Description", value: $description }]
        language: "en"
      }
    ) {
      item {
        itemId
      }
    }
  }
`;

const AddConstitutionalGovernment = ({
  onAddGovernment,
}: AddConstitutionalGovernmentProps): JSX.Element => {
  const [governmentName, setGovernmentName] = useState('');
  const [title, setTitle] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [logo, setLogo] = useState<File | null>(null);
  const [description, setDescription] = useState('');
  const [descriptionEn, setDescriptionEn] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedDescriptionKey, setSelectedDescriptionKey] = useState('description-pt');
  const [selectedTitleKey, setSelectedTitleKey] = useState('title-pt');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }), []);

  const [createConstitutionalGovernment] = useMutation(CREATE_CONSTITUTIONAL_GOVERNMENT);
  const [addItemVersionEn] = useMutation(ADD_ITEM_VERSION_EN);
  const [updateItemEn] = useMutation(UPDATE_ITEM_EN);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setLogo(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !titleEn) {
      setErrorMessage('Both Title [PT] and Title [EN] are required.');
      return;
    }

    const itemName = removeAccents(governmentName);

    const startDateFormatted = startDate.replace(/-/g, '') + 'T000000Z';
    const endDateFormatted = endDate.replace(/-/g, '') + 'T000000Z';

    try {
      const { data } = await createConstitutionalGovernment({
        variables: {
          itemName,
          title,
          logo: '<image mediaid="{66D6B393-C6A1-48B9-A9EF-6EA4F844F932}" />',
          description,
          startDate: startDateFormatted,
          endDate: endDateFormatted,
          templateId: '{06500B0C-CFF1-48E2-92B0-369995A77C14}',
          parent: '{5B40F5B4-7B72-40A4-931F-E0050864F3D2}',
        },
      });

      const itemId = data?.createItem?.item?.itemId;

      if (itemId) {
        await addItemVersionEn({ variables: { itemId } });
        await updateItemEn({
          variables: {
            itemId,
            title: titleEn,
            description: descriptionEn,
          },
        });

        onAddGovernment(itemId, title, titleEn, startDateFormatted, endDateFormatted);
      }
    } catch (error: unknown) {
      if (error instanceof Error && error.message.includes('The item name')) {
        setErrorMessage('The name already exists, please choose another.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2>Add Constitutional Government</h2>
      <div>
        <label htmlFor="governmentName" className="block text-lg font-medium text-gray-700">
          Government Name
        </label>
        <input
          type="text"
          id="governmentName"
          value={governmentName}
          onChange={(e) => setGovernmentName(e.target.value)}
          className="mt-2 block w-full p-3 text-lg border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>

      <div>
        <Tabs
          aria-label="Government Title Tabs"
          selectedKey={selectedTitleKey}
          onSelectionChange={(key) => setSelectedTitleKey(key as string)}
        >
          <Tab key="title-pt" title="Title [PT]">
            <input
              type="text"
              id="title-pt"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-2 block w-full p-3 text-lg border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </Tab>
          <Tab key="title-en" title="Title [EN]">
            <input
              type="text"
              id="title-en"
              value={titleEn}
              onChange={(e) => setTitleEn(e.target.value)}
              className="mt-2 block w-full p-3 text-lg border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </Tab>
        </Tabs>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Logo</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleLogoChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <Tabs
          aria-label="Government Description Tabs"
          selectedKey={selectedDescriptionKey}
          onSelectionChange={(key) => setSelectedDescriptionKey(key as string)}
        >
          <Tab key="description-pt" title="Description [PT]">
            <ReactQuill theme="snow" value={description} onChange={setDescription} />
          </Tab>
          <Tab key="description-en" title="Description [EN]">
            <ReactQuill theme="snow" value={descriptionEn} onChange={setDescriptionEn} />
          </Tab>
        </Tabs>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Start Date</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">End Date</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div className="flex justify-end">
        <Button type="submit" color="primary" size="lg">
          Add Government
        </Button>
      </div>
      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
    </form>
  );
};

export default AddConstitutionalGovernment;
