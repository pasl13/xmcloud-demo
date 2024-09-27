import React, { useEffect, useCallback } from 'react';
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter } from '@material-tailwind/react';
import {
  ImageField,
  RichTextField,
  TextField,
  Text as JSSText,
  RichText as JSSRichText,
  Image as JSSImage,
} from '@sitecore-jss/sitecore-jss-nextjs';

type ReusableDialogProps = {
  open: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  currentIndex: number;
  totalItems?: number;
  currentItem: {
    title?: TextField;
    image?: ImageField;
    description?: RichTextField;
  };
  prevLabel?: string;
  nextLabel?: string;
};

const Modal = ({
  open,
  currentIndex,
  totalItems,
  onClose,
  onNext,
  onPrev,
  currentItem,
  prevLabel,
  nextLabel,
}: ReusableDialogProps): JSX.Element => {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        onNext();
      } else if (event.key === 'ArrowLeft') {
        onPrev();
      }
    },
    [onNext, onPrev]
  );

  useEffect(() => {
    if (open) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, handleKeyDown]);

  return (
    <Dialog open={open} handler={onClose} className="modal-container">
      <DialogHeader className="modal-header">
        {currentItem.title && (
          <h3>
            <JSSText field={currentItem.title} />
          </h3>
        )}
        <div className="modal-count">
          <span className="modal-count-index">{currentIndex + 1}</span>/{totalItems}
        </div>
        <button onClick={onClose} className="modal-close" aria-label="Close">
          <span className="modal-close-icon">×</span>
        </button>
      </DialogHeader>

      <DialogBody className="modal-body">
        <div className="modal-content">
          {currentItem.title && (
            <h3>
              <JSSText field={currentItem.title} />
            </h3>
          )}
          {currentItem.image && <JSSImage field={currentItem.image} className="modal-image" />}
          {currentItem.description && (
            <JSSRichText field={currentItem.description} className="modal-description" />
          )}
        </div>
      </DialogBody>

      <DialogFooter>
        <Button
          variant="text"
          className="modal-button-previous"
          onClick={onPrev}
          disabled={currentIndex === 0}
        >
          {prevLabel}
          <span className="modal-button-icon">←</span>
        </Button>

        <Button
          variant="text"
          className="modal-button-next"
          onClick={onNext}
          disabled={totalItems ? currentIndex === totalItems - 1 : false}
        >
          <span className="modal-button-icon">→</span>
          {nextLabel}
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default Modal;
