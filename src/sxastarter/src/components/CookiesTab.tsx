// 'use client';
import React, { useState } from 'react';
import { ComponentParams, ComponentRendering } from '@sitecore-jss/sitecore-jss-nextjs';

type FieldObject = {
  value: string;
};

type FieldType = {
  Title: FieldObject;
  Description: FieldObject;
};

interface CookiesTabProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
  fields: FieldType;
}

export const Default = (props: CookiesTabProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  console.log('CookiesTabProps:', props);
  const [isOpen, setIsOpen] = useState(false);

  const handleIconClick = () => {
    console.log('handleIconClick', isOpen);
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  // console.log('isOpen:', isOpen);

  return (
    <>
      <div className={`component ${props.params.styles}`} id={id ? id : undefined}>
        <div className="component-content">
          <p className="text-xl font-bold">{props.fields.Title.value}</p>
          <button 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
            onClick={handleIconClick}
          >
            Open Modal
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-white p-8">
            <p>This is the modal content</p>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" 
              onClick={handleCloseModal}
            >
              Close Modal
            </button>
          </div>
        </div>
      )}
    </>
  );
};
