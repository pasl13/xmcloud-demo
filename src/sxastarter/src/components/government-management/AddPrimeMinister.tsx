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
  endDate: string;
}

const GET_OFFICIALS = gql`
  query getOfficials {
    item(where: { path: "/sitecore/content/Demo/Demo/Data/Government Officials" }) {
      children {
        nodes {
          name
          itemId
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
    $endDate: String!
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

const AddPrimeMinister = ({
  itemId,
  title,
  titleEn,
  startDate,
  endDate,
}: AddPrimeMinisterProps): JSX.Element => {
  const [selectedOfficials, setSelectedOfficials] = useState<Official[]>([]);
  const [officialList, setOfficialList] = useState<Official[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useQuery(GET_OFFICIALS, {
    onCompleted: (data) => {
      setOfficialList(data?.item?.children?.nodes || []);
    },
  });

  const [createPrimeMinister] = useMutation(CREATE_PM_RECORD);

  const handleSubmit = async (e: React.FormEvent) => {
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
      const { data } = await createPrimeMinister({
        variables: {
          title: `${selectedOfficials[0].name} - Primeiro-Ministro - ${title}`,
          official: SitecoreGuidUtils.convertRawToGuid(selectedOfficials[0].itemId),
          startDate,
          endDate,
          templateId: '{A33A3B59-C0A6-4611-B8C8-48CFD42F112D}',
          parent: itemId,
        },
      });

      console.log(data);
    } catch (error: unknown) {
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
