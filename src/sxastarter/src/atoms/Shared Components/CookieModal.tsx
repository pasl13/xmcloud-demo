'use client';
import React, { useEffect } from 'react';
import ReactPortal from './ReactPortal';

interface CookieModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  handleClose: () => void;
}

const CookieModal = ({ children, isOpen, handleClose }: CookieModalProps) => {
  useEffect(() => {
    const closeOnEscapeKey = (e: KeyboardEvent) => (e.key === 'Escape' ? handleClose() : null);
    document.body.addEventListener('keydown', closeOnEscapeKey);
    return () => {
      document.body.removeEventListener('keydown', closeOnEscapeKey);
    };
  }, [handleClose]);
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return (): void => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <ReactPortal wrapperId="react-portal-modal-container">
      <>
        <div className="fixed top-0 left-0 w-screen h-screen bg-neutral-800 opacity-50" />
        <div
          className="fixed rounded flex flex-col box-border min-w-fit overflow-hidden p-5 bg-zinc-800 inset-y-32 
        inset-x-1"
        >
          <button
            onClick={handleClose}
            className="py-2 px-8 self-end font-bold hover:bg-violet-600 border rounded text-white"
          >
            close
          </button>
          <div className="box-border h-5/6">{children}</div>
        </div>
      </>
    </ReactPortal>
  );
};

export default CookieModal;
