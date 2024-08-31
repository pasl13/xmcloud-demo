import React, { useState } from 'react';
import { Button } from '@nextui-org/react';
import { useQuery, useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import MultilistWithSearch from 'src/atoms/Shared Components/MultilistWithSearch';
import SitecoreGuidUtils from 'src/utils/sitecoreGuid';

interface Official {
  name: string;
  itemId: string;
}

interface AddPrimeMinisterProps {
  itemId: string;
  title: string;
  titleEn: string;
  startDate: string;
}

const GET_OFFICIALS = gql`
  query GetOfficials {
    item(where: { path: "/sitecore/content/Demo/Demo/Data/Government Officials" }) {
      children {
        nodes {
          itemId
          field(name: "FullName") {
            value
          }
        }
      }
    }
  }
`;

const CREATE_PM_RECORD = gql`
  mutation CreatePrimeMinisterRecord(
    $title: String!
    $official: String!
    $startDate: String!
    $templateId: ID!
    $parent: ID!
  ) {
    createItem(
      input: {
        name: "prime-minister"
        fields: [
          { name: "Title", value: $title }
          { name: "Official", value: $official }
          { name: "StartDate", value: $startDate }
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

const UPDATE_ITEM = gql`
  mutation UpdateItem($itemId: ID!) {
    updateItem(
      input: {
        itemId: $itemId
        fields: [{ name: "__Display name", value: "primeiro-ministro" }]
        language: "pt"
      }
    ) {
      item {
        itemId
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
  mutation UpdateItemEn($itemId: ID!, $title: String!) {
    updateItem(
      input: { itemId: $itemId, fields: [{ name: "Title", value: $title }], language: "en" }
    ) {
      item {
        itemId
      }
    }
  }
`;

const AddPrimeMinister = ({
  itemId,
  title,
  titleEn,
  startDate,
}: AddPrimeMinisterProps): JSX.Element => {
  const [selectedOfficials, setSelectedOfficials] = useState<Official[]>([]);
  const [officialList, setOfficialList] = useState<Official[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useQuery(GET_OFFICIALS, {
    onCompleted: (data) => {
      const officials = data?.item?.children?.nodes || [];
      const formattedOfficials = officials.map(
        (official: { itemId: string; field: { value: string } }) => ({
          name: official.field?.value || '',
          itemId: official.itemId,
        })
      );
      setOfficialList(formattedOfficials);
    },
  });

  const [createPrimeMinister] = useMutation(CREATE_PM_RECORD);
  const [updateItem] = useMutation(UPDATE_ITEM);
  const [addItemVersionEn] = useMutation(ADD_ITEM_VERSION_EN);
  const [updateItemEn] = useMutation(UPDATE_ITEM_EN);

  const handlePrimeMinisterCreation = async () => {
    const selectedOfficial = selectedOfficials[0];
    const primeMinisterTitle = `${selectedOfficial.name} - Primeiro-Ministro - ${title}`;

    const { data } = await createPrimeMinister({
      variables: {
        title: primeMinisterTitle,
        official: SitecoreGuidUtils.convertRawToGuid(selectedOfficial.itemId),
        startDate,
        templateId: '{A33A3B59-C0A6-4611-B8C8-48CFD42F112D}',
        parent: itemId,
      },
    });

    const newItemId = SitecoreGuidUtils.convertRawToGuid(data?.createItem?.item?.itemId);

    if (newItemId) {
      await updateItem({ variables: { itemId: newItemId } });
      await addItemVersionEn({ variables: { itemId: newItemId } });

      const primeMinisterTitleEn = `${selectedOfficial.name} - Prime Minister - ${titleEn}`;
      await updateItemEn({
        variables: { itemId: newItemId, title: primeMinisterTitleEn },
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    if (selectedOfficials.length === 0) {
      setErrorMessage('Please select one prime-minister.');
      return;
    }
    if (selectedOfficials.length > 1) {
      setErrorMessage('Only one prime minister can be selected.');
      return;
    }

    try {
      await handlePrimeMinisterCreation();
    } catch (error) {
      if (error instanceof Error && error.message.includes('The item name')) {
        setErrorMessage('The name already exists, please choose another.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2>Add Prime Minister</h2>
      <div>
        <label htmlFor="primeMinister" className="block text-lg font-medium text-gray-700">
          Prime Minister
        </label>
        <MultilistWithSearch
          items={officialList}
          setItems={setOfficialList}
          selectedItems={selectedOfficials}
          setSelectedItems={setSelectedOfficials}
        />
      </div>
      <div className="flex justify-end">
        <Button type="submit" color="primary" size="lg">
          Add Prime Minister
        </Button>
      </div>
      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
    </form>
  );
};

export default AddPrimeMinister;
