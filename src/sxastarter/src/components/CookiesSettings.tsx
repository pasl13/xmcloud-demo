'use client';
import React, { useState } from 'react';
import { ComponentParams, ComponentRendering } from '@sitecore-jss/sitecore-jss-nextjs';
import CookieModal from 'src/atoms/Shared Components/CookieModal';

interface CookiesSettingsProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
}

export const Default = (props: CookiesSettingsProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className={`component ${props.params.styles}`} id={id ? id : undefined}>
      <div className="component-content">
        <p className="">CookiesSettings Component</p>
        <button onClick={() => setModalOpen(true)}>Open Modal</button>
      </div>
      {modalOpen && (
        <CookieModal isOpen={modalOpen} handleClose={() => setModalOpen(!modalOpen)}>
          <div className="flex flex-col justify-between h-full w-full">
            <div className="flex flex-col mt-auto mb-auto items-center p-8">
              <span>Close Modal?</span>
              <span>All current progress will be lost</span>
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-8 align-center">
              <button
                className="py-2 px-8 font-bold hover:bg-violet-600 border rounded"
                type="button"
                onClick={() => setModalOpen(!modalOpen)}
              >
                Continue Working
              </button>
            </div>
          </div>
        </CookieModal>
      )}
    </div>
  );
};
