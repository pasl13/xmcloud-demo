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

  console.log('isOpen:', isOpen);

  return (
    <>
      <div className={`component ${props.params.styles}`} id={id ? id : undefined}>
        <div className="component-content">
          <p>{props.fields.Title.value}</p>
          <button onClick={handleIconClick}>Open Modal</button>
        </div>
      </div>
      {isOpen && (
        <div>
          <div>
            <p>This is the modal content</p>
            <button onClick={handleCloseModal}>Close Modal</button>
          </div>
        </div>
      )}
    </>
  );
};
