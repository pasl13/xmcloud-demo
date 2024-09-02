import React, { useState } from 'react';
import { Button } from '@nextui-org/react';
import { useQuery, useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import SitecoreGuidUtils from 'src/utils/sitecoreGuid';
import AddOfficial from './AddOfficial';

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

const CREATE_PRIME_MINISTER = gql`
  mutation CreatePrimeMinister(
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

const AddPrimeMinister = ({}: AddPrimeMinisterProps): JSX.Element => {
  const handleOfficialSelection = (itemId: string) => {
    console.log('Selected official:', itemId);
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 border rounded-lg shadow-md bg-white">
      <h2 className="text-2xl font-semibold">Add Prime Minister</h2>
      <AddOfficial onSelectOfficial={handleOfficialSelection} />
      <div className="flex justify-end">
        <Button type="submit" color="primary" size="lg">
          Add Prime Minister
        </Button>
      </div>
    </form>
  );
};

export default AddPrimeMinister;
