'use client';
import React, { useState } from 'react';
import { ComponentParams, ComponentRendering } from '@sitecore-jss/sitecore-jss-nextjs';
import CookieModal from 'src/atoms/Shared Components/CookieModal';

interface FieldsTypes {
  'Only Required Button Label': string;
  Title: string;
  Description: string;
  Icon: string;
  'Submit Changes Button Label': string;
  'Accept All Button Label': string;
  Items: Item[];
}

interface Item {
  id: string;
  url: string;
  name: string;
  displayName: string;
  fields: Fields;
}

interface Fields {
  Title: string;
  Description: string;
  'Is Selected': string;
  Enabled: string;
}

interface CookiesSettingsProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
  fields: FieldsTypes;
}

export const Default = (props: CookiesSettingsProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
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
      <div className="component-content">
        <p className="">CookiesSettings Component</p>
        <button
          className="mt-2 py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded"
          onClick={() => setModalOpen(true)}
        >
          Open Modal
        </button>
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
