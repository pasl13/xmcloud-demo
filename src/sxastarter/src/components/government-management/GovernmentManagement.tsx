import React, { useState } from 'react';
import { ComponentParams, ComponentRendering, TextField } from '@sitecore-jss/sitecore-jss-nextjs';
import { ApolloProvider } from '@apollo/client';
import client from 'src/config/apolloClient';
import OfficialsDropdown from './OfficialsDropdown';

type ResultsFieldText = {
  id: string;
  field: {
    jsonValue: TextField;
  };
};

interface Fields {
  data: {
    datasource: {
      children: {
        results: ResultsFieldText[];
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
  const id = props.params.RenderingIdentifier;

  // Extract official results or default to an empty array if not available
  const officialResults = props?.fields?.data?.datasource?.children?.results ?? [];

  const officialsList = officialResults.map(({ id, field }) => ({
    id,
    name: field.jsonValue?.value?.toString() ?? '',
  }));

  // State to store selected official ID
  const [selectedOfficialId, setSelectedOfficialId] = useState('');
  console.log(selectedOfficialId);

  // Handle official selection from OfficialsDropdown
  const handleOfficialSelect = (officialId: string) => {
    setSelectedOfficialId(officialId);
    console.log(`Selected Official ID: ${officialId}`);
  };

  return (
    <ApolloProvider client={client}>
      <div
        className={`component government-management ${props.params.styles}`}
        id={id ? id : undefined}
      >
        <div className="component-content space-y-4">
          <h1 className="font-bold text-gray-800">Government Management</h1>

          {/* Render the OfficialsDropdown component */}
          <OfficialsDropdown officials={officialsList} onSelect={handleOfficialSelect} />
        </div>
      </div>
    </ApolloProvider>
  );
};
