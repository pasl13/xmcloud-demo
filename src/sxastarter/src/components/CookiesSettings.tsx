'use client';
import React, { useState } from 'react';
import { ComponentParams, ComponentRendering, Field } from '@sitecore-jss/sitecore-jss-nextjs';
import CookieModal from 'src/atoms/Shared Components/CookieModal';


interface FieldsTypes {
  OnlyRequiredButtonLabel: Field<string>;
  Title: Field<string>;
  Description: Field<string>;
  Icon: Field<string>;
  SubmitChangesButtonLabel: Field<string>;
  AcceptAllButtonLabel: Field<string>;
  Items: Item[];
}

interface Item {
  id: Field<string>;
  url: Field<string>;
  name: Field<string>;
  displayName: Field<string>;
  fields: Fields;
}

interface Fields {
  Title: Field<string>;
  Description: Field<string>;
  'Is Selected': Field<string>;
  Enabled: Field<string>;
}

interface CookiesSettingsProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
  fields: FieldsTypes;
}

export const Default = (props: CookiesSettingsProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { fields, ...restProps } = props;
  const { 
    Items, 
    Title, 
    Description, 
    Icon, 
    OnlyRequiredButtonLabel, 
    SubmitChangesButtonLabel, 
    AcceptAllButtonLabel 
  } = fields;
  const [modalOpen, setModalOpen] = useState(false);
  const handleClose = () => {
    setModalOpen(false);
  };

  console.log('CookiesSettings Component', props);
  return (
    <div
      className={`
      fixed bottom-0 w-full bg-gray-800 text-white  ${props.params.styles}`}
      id={id ? id : undefined}
    >
      <div className="component-content container mx-auto p-4">
        <div className="grid grid-cols-2 gap-8">
          <div className="container">
            {Title && <h3 className="text-white">{Title.value}</h3>}
            {Description && <p className="text-white">{Description.value}</p>}
          </div>
          <div className="flex flex-col gap-4">
            {AcceptAllButtonLabel && (
              <button
                className="mt-2 py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded"
                onClick={() => setModalOpen(true)}
              >
                {AcceptAllButtonLabel.value}
              </button>
            )}
            {OnlyRequiredButtonLabel && (
              <button
                className="mt-2 py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded"
                onClick={() => setModalOpen(true)}
              >
                {OnlyRequiredButtonLabel.value}
              </button>
            )}
            {SubmitChangesButtonLabel && (
              <button
                className="mt-2 py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded"
                onClick={() => setModalOpen(true)}
              >
                {SubmitChangesButtonLabel.value}
              </button>
            )}
          </div>
        </div>
      </div>
      {modalOpen && (
        <CookieModal isOpen={modalOpen} handleClose={handleClose}>
          <div className="flex flex-col justify-between h-full w-full">
            <div className="flex flex-col mt-auto mb-auto items-center p-8">
              <span className="text-white">Close Modal?</span>
              <span className="text-white">All current progress will be lost</span>
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-8 align-center">
              <button
                className="py-2 px-8 font-bold hover:bg-violet-600 border rounded text-white"
                type="button"
                onClick={handleClose}
              >
                Submit and close
              </button>
            </div>
          </div>
        </CookieModal>
      )}
    </div>
  );
};
