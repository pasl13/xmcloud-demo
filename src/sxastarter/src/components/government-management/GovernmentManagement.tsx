import React, { useState } from 'react';
import { ComponentParams, ComponentRendering, TextField } from '@sitecore-jss/sitecore-jss-nextjs';
import { ApolloProvider } from '@apollo/client';
import client from 'src/config/apolloClient';
import OfficialsDropdown from './OfficialsDropdown';
import AddOfficialForm from './AddOfficialForm';
import { formatUUID } from 'src/utils/formatUUID';

type ResultsFieldText = {
  id: string;
  template: {
    id: string;
  };
  field: {
    jsonValue: TextField;
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
  };
}

interface GovernmentManagementProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
  fields: Fields;
}

export const Default = (props: GovernmentManagementProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const parent = `{${props.rendering.dataSource?.toUpperCase()}}`;
  const templateId = formatUUID(props.fields.data.datasource.children.results[0].template.id);
  const language = props.fields.data.datasource.language.name;

  // Extract official results or default to an empty array if not available
  const officialResults = props?.fields?.data?.datasource?.children?.results ?? [];

  const officialsList = officialResults.map(({ id, field }) => ({
    id,
    name: field.jsonValue?.value?.toString() ?? '',
  }));

  // State to store selected official ID and the list of officials
  const [selectedOfficialId, setSelectedOfficialId] = useState('');
  const [officials, setOfficials] = useState(officialsList);
  console.log(selectedOfficialId);
  console.log('GovernmentManagementProps', props);

  // Handle official selection from OfficialsDropdown
  const handleOfficialSelect = (officialId: string) => {
    setSelectedOfficialId(officialId);
    console.log(`Selected Official ID: ${officialId}`);
  };

  // Handle adding a new official
  const handleAddOfficial = (officialName: string) => {
    const newOfficial = {
      id: `${Date.now()}`, // Temporary ID (could be replaced by a backend call)
      name: officialName,
    };

    // Update the officials list with the new official
    setOfficials([...officials, newOfficial]);
    console.log(`New official added: ${officialName}`);
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

          {/* Render the AddOfficialForm component */}
          <AddOfficialForm
            onAddOfficial={handleAddOfficial}
            parent={parent}
            templateId={templateId}
            language={language}
          />
        </div>
      </div>
    </ApolloProvider>
  );
};
