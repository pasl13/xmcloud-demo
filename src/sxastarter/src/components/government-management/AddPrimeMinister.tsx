import React, { useState } from 'react';
import { Button } from '@nextui-org/react';
import { useQuery } from '@apollo/client';
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

const AddPrimeMinister = ({ itemId, title, titleEn }: AddPrimeMinisterProps): JSX.Element => {
  const [selectedOfficials, setSelectedOfficials] = useState<Official[]>([]);
  const [officialList, setOfficialList] = useState<Official[]>([]);

  const { data } = useQuery(GET_OFFICIALS, {
    onCompleted: (data) => {
      setOfficialList(data?.item?.children?.nodes || []);
    },
  });

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    console.log(
      'selectedOfficials',
      SitecoreGuidUtils.convertRawToGuid(selectedOfficials[0].itemId)
    );
    console.log('Related Info:', {
      itemId,
      title,
      titleEn,
    });
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
      <Button type="submit" color="primary" size="lg">
        Add Prime Minister
      </Button>
    </form>
  );
};

export default AddPrimeMinister;
