'use client';
import React, { useEffect } from 'react';
import ReactPortal from './ReactPortal';

interface CookieModalProps {
  children: React.ReactChildren | React.ReactChild;
  isOpen: boolean;
  handleClose: () => void;
}

const CookieModal = ({
  children,
  isOpen,
  handleClose
}: CookieModalProps) => {
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
        <div className="fixed top-0 left-0 w-screen h-screen z-40 bg-neutral-800 opacity-50" />
      </>
    </ReactPortal>
  );
};

export default CookieModal;
