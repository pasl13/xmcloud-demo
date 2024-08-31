import React, { useMemo, useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import { ComponentParams, ComponentRendering } from '@sitecore-jss/sitecore-jss-nextjs';
import client from 'src/config/apolloClient';
import { Tab, Tabs } from '@nextui-org/react';
import AddConstitutionalGovernment from './AddConstitutionalGovernment';
import AddPrimeMinister from './AddPrimeMinister';

interface ResultsGovernment {
  id: string;
  name: string;
  field: {
    value: string;
  };
}

interface Fields {
  data: {
    datasource: {
      hasChildren: boolean;
      children: {
        results: ResultsGovernment[];
      };
    };
  };
}

interface GovernmentManagementProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
  fields: Fields;
}

const sortGovernments = (a: ResultsGovernment, b: ResultsGovernment): number => {
  if (a.field.value === '1') return -1;
  if (b.field.value === '1') return 1;
  return b.name.localeCompare(a.name);
};

const GovernmentManagement = ({ params, fields }: GovernmentManagementProps): JSX.Element => {
  const { RenderingIdentifier: id } = params;
  const { hasChildren, children } = fields.data.datasource;

  const constitutionalGovernments = useMemo<ResultsGovernment[]>(() => {
    if (!hasChildren) return [];
    return children.results.sort(sortGovernments);
  }, [hasChildren, children]);

  const [selectedGovernmentId, setSelectedGovernmentId] = useState<string>(
    constitutionalGovernments[0]?.id || ''
  );
  const [selectedGovernmentTab, setSelectedGovernmentTab] = useState<string>(
    'constitutional-management'
  );
  const [governmentDetails, setGovernmentDetails] = useState({
    itemId: '',
    title: '',
    titleEn: '',
    startDate: '',
  });

  const handleAddGovernment = (
    itemId: string,
    title: string,
    titleEn: string,
    startDate: string
  ): void => {
    setGovernmentDetails({ itemId, title, titleEn, startDate });
    setSelectedGovernmentTab('prime-minister');
  };

  return (
    <ApolloProvider client={client}>
      <div className={`component government-management ${params.styles}`} id={id}>
        <div className="component-content space-y-4">
          <h1 className="font-bold text-gray-800">Government Management</h1>
          <Tabs
            aria-label="Government Tabs"
            selectedKey={selectedGovernmentId}
            onSelectionChange={(key) => setSelectedGovernmentId(key as string)}
          >
            {constitutionalGovernments.map((gov) => (
              <Tab key={gov.id} title={gov.name}>
                <div>
                  <p>{`Content for ${gov.name}`}</p>
                </div>
              </Tab>
            ))}
            <Tab key="add-new" title="+ Add New">
              <Tabs
                aria-label="Government Management Tabs"
                selectedKey={selectedGovernmentTab}
                onSelectionChange={(key) => setSelectedGovernmentTab(key as string)}
              >
                <Tab key="constitutional-management" title="Constitutional Management">
                  <AddConstitutionalGovernment onAddGovernment={handleAddGovernment} />
                </Tab>
                <Tab key="prime-minister" title="Prime Minister">
                  <AddPrimeMinister {...governmentDetails} />
                </Tab>
              </Tabs>
            </Tab>
          </Tabs>
        </div>
      </div>
    </ApolloProvider>
  );
};

export default GovernmentManagement;
