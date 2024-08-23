import React, { useState, useEffect } from 'react';
import { ComponentParams, ComponentRendering, TextField } from '@sitecore-jss/sitecore-jss-nextjs';
import { ApolloProvider } from '@apollo/client';
import client from 'src/config/apolloClient';
import Dropdown from 'src/atoms/Shared Components/Dropdown';
import AddOfficialForm from './AddOfficialForm';

type ResultsFieldText = {
  id: string;
  field: {
    jsonValue: TextField;
  };
};

type ResultsSexItems = {
  id: string;
  displayName: string;
};

interface Fields {
  data: {
    datasource: {
      language: {
        name: string;
      };
      children: {
        results: ResultsFieldText[];
      };
    };
    sexItems: {
      children: {
        results: ResultsSexItems[];
      };
    };
  };
}

interface GovernmentManagementProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
  fields: Fields;
}

export const Default = (props: GovernmentManagementProps): JSX.Element => {
  console.log('GovernmentManagementProps', props);

  const id = props?.params?.RenderingIdentifier;
  const parent = `{${props?.rendering?.dataSource?.toUpperCase()}}`;
  const language = props?.fields?.data?.datasource?.language?.name;
  const sexItems = props?.fields?.data?.sexItems?.children?.results;

  // Extract official results or default to an empty array if not available
  const officialResults = props?.fields?.data?.datasource?.children?.results ?? [];

  // Map officialsList for the Dropdown
  const officialsList = officialResults.map(({ id, field }) => ({
    id,
    label: field.jsonValue?.value?.toString() ?? '',
  }));

  // State to store selected official ID and the list of officials
  const [selectedOfficialId, setSelectedOfficialId] = useState('');
  const [officials, setOfficials] = useState(officialsList);

  // Update the officials list when officialResults changes
  useEffect(() => {
    setOfficials(officialsList);
  }, [officialResults]);

  // Handle official selection from Dropdown
  const handleOfficialSelect = (officialId: string) => {
    setSelectedOfficialId(officialId);
    console.log(`Selected Official ID: ${officialId}`);
  };

  // Handle adding a new official
  const handleAddOfficial = (officialId: string, officialName: string) => {
    const newOfficial = {
      id: officialId,
      label: officialName,
    };

    // Update the officials list with the new official
    setOfficials((prevOfficials) => [...prevOfficials, newOfficial]);
  };

  return (
    <ApolloProvider client={client}>
      <div
        className={`component government-management ${props.params.styles}`}
        id={id ? id : undefined}
      >
        <div className="component-content space-y-4">
          <h1 className="font-bold text-gray-800">Government Management</h1>

          {/* Render the Dropdown component */}
          <Dropdown
            id="officials-dropdown"
            value={selectedOfficialId}
            options={officials}
            placeholder="-- Select an Official --"
            onSelect={handleOfficialSelect}
            selectClass="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            required={true}
            sort={true}
          />

          {/* Render the AddOfficialForm component */}
          <AddOfficialForm
            onAddOfficial={handleAddOfficial}
            parent={parent}
            language={language}
            sexItems={sexItems}
          />
        </div>
      </div>
    </ApolloProvider>
  );
};
