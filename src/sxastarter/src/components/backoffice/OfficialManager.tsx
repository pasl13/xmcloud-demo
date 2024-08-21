import React, { useState } from 'react';
import { ComponentParams, ComponentRendering, TextField } from '@sitecore-jss/sitecore-jss-nextjs';
import { ApolloProvider } from '@apollo/client';
import client from 'src/config/apolloClient';
import Modal from 'src/components/shared/Modal';
import AddGovernmentOfficial from './AddGovernmentOfficial';
import 'bootstrap-icons/font/bootstrap-icons.css';

type ResultsFieldText = {
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

type OfficialManagerProps = {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
  fields: Fields;
};

const OfficialDropdownItem = ({ field }: { field: TextField }): JSX.Element => {
  return <option value={field.value}>{field.value}</option>;
};

export const Default = (props: OfficialManagerProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const datasource = props.fields?.data?.datasource;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [officials, setOfficials] = useState<ResultsFieldText[]>(
    datasource?.children.results || []
  );

  const handleOpenModal = (): void => setIsModalOpen(true);
  const handleCloseModal = (): void => setIsModalOpen(false);

  const handleAddOfficial = (name: string): void => {
    setOfficials((prevOfficials) => [...prevOfficials, { field: { jsonValue: { value: name } } }]);

    handleCloseModal();
  };

  const dropdownOptions = officials
    .filter((element: ResultsFieldText) => element?.field?.jsonValue?.value)
    .sort((a, b) => (a.field.jsonValue.value + '').localeCompare(b.field.jsonValue.value + ''))
    .map((element: ResultsFieldText, key: number) => (
      <OfficialDropdownItem
        key={`${key}${element.field.jsonValue?.value || ''}`}
        field={element.field.jsonValue}
      />
    ));

  return (
    <ApolloProvider client={client}>
      <div className={`component official-manager ${props.params.styles}`} id={id ? id : undefined}>
        <div className="component-content container mx-auto px-4">
          <h1 className="my-4 text-2xl font-bold">Official Manager Component</h1>

          <div className="flex items-center">
            <div className="relative">
              <i className="bi bi-person absolute left-4 top-1/2 transform -translate-y-1/2"></i>
              <select
                className="form-control pl-10 pr-3 py-2 h-12 text-lg rounded border-gray-300"
                id="officialsDropdown"
              >
                {dropdownOptions}
              </select>
            </div>

            <div className="ml-3">
              <button
                className="bg-blue-500 text-white flex items-center justify-center h-9 w-9 p-0 text-lg rounded-full"
                onClick={handleOpenModal}
                title="Add New Official"
              >
                <i className="bi bi-plus"></i>
              </button>
            </div>
          </div>

          <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
            <AddGovernmentOfficial onAddOfficial={handleAddOfficial} />
          </Modal>
        </div>
      </div>
    </ApolloProvider>
  );
};
