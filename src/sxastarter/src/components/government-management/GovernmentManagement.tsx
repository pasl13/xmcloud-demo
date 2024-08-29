import React, { useState, useEffect, useMemo } from 'react';
import { ApolloProvider } from '@apollo/client';
import {
  Tabs,
  Tab,
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
  useDisclosure,
  Modal,
  ModalContent,
  ModalBody,
} from '@nextui-org/react';
import moment from 'moment';

import { ComponentParams, ComponentRendering, TextField } from '@sitecore-jss/sitecore-jss-nextjs';
import client from 'src/config/apolloClient';
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

export const Default = ({ rendering, params, fields }: GovernmentManagementProps): JSX.Element => {
  const { RenderingIdentifier: id } = params;
  const { dataSource: parent } = rendering;
  const { name: language } = fields.data.datasource.language;
  const sexItems = fields.data.sexItems.children.results;

  const constitutionalGovernments = useMemo(
    () =>
      fields.data.getConstitutionalGovernments.children.results.sort((a, b) => {
        const dateA = a.field.value
          ? moment(a.field.value, 'YYYYMMDDTHHmmssZ').toDate().getTime()
          : Infinity;
        const dateB = b.field.value
          ? moment(b.field.value, 'YYYYMMDDTHHmmssZ').toDate().getTime()
          : Infinity;
        return dateB - dateA;
      }),
    [fields]
  );

  const officialResults = fields.data.datasource.children.results || [];
  const officialsList = officialResults.map(({ id, field }) => ({
    key: id,
    name: field.jsonValue?.value?.toString() || '',
  }));

  const [selectedOfficialId, setSelectedOfficialId] = useState<string>('');
  const [selectedGovernmentId, setSelectedGovernmentId] = useState<string>(
    constitutionalGovernments[0]?.id || ''
  );
  const [officials, setOfficials] = useState(officialsList);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    setOfficials(officialsList);
  }, [officialResults]);

  const handleOfficialSelect = (officialId: string) => {
    setSelectedOfficialId(officialId);
  };

  const handleAddOfficial = (officialId: string, officialName: string) => {
    setOfficials((prevOfficials) => [...prevOfficials, { key: officialId, name: officialName }]);
    onOpenChange();
  };

  return (
    <ApolloProvider client={client}>
      <div className={`component government-management ${params.styles}`} id={id}>
        <div className="component-content space-y-4">
          <h1 className="font-bold text-gray-800">Government Management</h1>
          <div className="flex items-center space-x-4">
            <Dropdown>
              <DropdownTrigger>
                <Button className="bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-md hover:bg-gray-300 transition duration-300 ease-in-out">
                  {selectedOfficialId
                    ? officials.find((official) => official.key === selectedOfficialId)?.name
                    : '-- Select an official --'}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Select an official"
                selectionMode="single"
                selectedKeys={selectedOfficialId ? new Set([selectedOfficialId]) : new Set()}
                onSelectionChange={(keys) => handleOfficialSelect(Array.from(keys).join(''))}
              >
                {officials.map((official) => (
                  <DropdownItem key={official.key}>{official.name}</DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>

            <Button
              onPress={onOpen}
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
            >
              + Add Official
            </Button>
          </div>
          <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="w-full max-w-3xl">
            <ModalContent>
              <>
                <ModalBody>
                  <AddOfficialForm
                    onAddOfficial={handleAddOfficial}
                    parent={parent}
                    language={language}
                    sexItems={sexItems}
                  />
                </ModalBody>
              </>
            </ModalContent>
          </Modal>

          <Tabs
            aria-label="Government Tabs"
            selectedKey={selectedGovernmentId}
            onSelectionChange={(key) => setSelectedGovernmentId(key as string)}
            className="flex justify-start space-x-4 border-b-2 border-gray-200 mb-4"
          >
            {constitutionalGovernments.map((gov) => (
              <Tab key={gov.id} title={gov.name}>
                <div>{`Content for ${gov.name}`}</div>
              </Tab>
            ))}
            <Tab key="add-new" title="+ Add New">
              <div className="p-4"></div>
            </Tab>
          </Tabs>
        </div>
      </div>
    </ApolloProvider>
  );
};
