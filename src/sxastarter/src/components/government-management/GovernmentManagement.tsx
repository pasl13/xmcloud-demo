import React, { useState, useEffect } from 'react';

// Third-party libraries
import { ComponentParams, ComponentRendering, TextField } from '@sitecore-jss/sitecore-jss-nextjs';
import { ApolloProvider } from '@apollo/client';
import moment from 'moment';
import { Tabs, Tab } from '@nextui-org/react';

// Configuration
import client from 'src/config/apolloClient';

// Custom components
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

type ResultsConstitutionalGovernment = {
  id: string;
  name: string;
  field: {
    value: string;
  };
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
    getConstitutionalGovernments: {
      children: {
        results: ResultsConstitutionalGovernment[];
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
  const parent = props?.rendering?.dataSource;
  const language = props?.fields?.data?.datasource?.language?.name;
  const sexItems = props?.fields?.data?.sexItems?.children?.results;

  const constitutionalGovernments =
    props?.fields?.data?.getConstitutionalGovernments?.children?.results.sort((a, b) => {
      const dateA = a?.field?.value
        ? moment(a.field.value, 'YYYYMMDDTHHmmssZ').toDate().getTime()
        : Infinity;
      const dateB = b?.field?.value
        ? moment(b.field.value, 'YYYYMMDDTHHmmssZ').toDate().getTime()
        : Infinity;

      return dateB - dateA;
    }) ?? [];

  console.log('constitutionalGovernments', constitutionalGovernments);

  // Extract official results or default to an empty array if not available
  const officialResults = props?.fields?.data?.datasource?.children?.results ?? [];

  // Map officialsList for the Dropdown
  const officialsList = officialResults.map(({ id, field }) => ({
    id,
    label: field.jsonValue?.value?.toString() ?? '',
  }));

  // State to store selected official ID and the list of officials
  const [selectedOfficialId, setSelectedOfficialId] = useState('');
  const [selectedGovernmentId, setSelectedGovernmentId] = useState(
    constitutionalGovernments[0]?.id || ''
  );
  const [officials, setOfficials] = useState(officialsList);

  // Update the officials list when officialResults changes
  useEffect(() => {
    setOfficials(officialsList);
  }, [officialResults]);

  // Handle official selection from Dropdown
  const handleOfficialSelect = (officialId: string) => {
    setSelectedOfficialId(officialId);
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

          {/* NextUI Tabs */}
          <Tabs
            aria-label="Government Tabs"
            selectedKey={selectedGovernmentId}
            onSelectionChange={(key) => setSelectedGovernmentId(key as string)}
            className="flex justify-start space-x-4 border-b-2 border-gray-200 mb-4"
          >
            {constitutionalGovernments.map((gov) => (
              <Tab
                key={gov.id}
                title={gov.name}
              >
                <div>{`Content for ${gov.name}`}</div>
              </Tab>
            ))}
          </Tabs>
        </div>
      </div>
    </ApolloProvider>
  );
};
