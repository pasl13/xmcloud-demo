import React, { useState } from 'react';
import { ComponentParams, ComponentRendering, TextField } from '@sitecore-jss/sitecore-jss-nextjs';
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
    <div className={`component official-manager ${props.params.styles}`} id={id ? id : undefined}>
      <div className="component-content container">
        <h1 className="my-4">Official Manager Component</h1>

        <div className="d-flex align-items-center">
          <div className="position-relative">
            <i
              className="bi bi-person position-absolute"
              style={{ top: '50%', left: '10px', transform: 'translateY(-50%)' }}
            ></i>
            <select
              className="form-control ps-5"
              id="officialsDropdown"
              style={{ height: '48px', fontSize: '1.25rem' }}
            >
              {dropdownOptions}
            </select>
          </div>

          <div className="ms-3">
            <button
              className="btn btn-primary d-flex align-items-center justify-content-center"
              style={{ height: '36px', width: '36px', padding: 0, fontSize: '1.25rem' }}
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
  );
};
